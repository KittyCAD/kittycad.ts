import { Client } from './client'
import ModelingCommandsWs from './api/modeling/modeling_commands_ws'
import { OkWebSocketResponseData } from './models'
import WorkerWebRTC from 'web-worker:./worker-webrtc.ts'

enum PointerState {
  DOWN,
  UP,
}

enum PointerButton {
  MIDDLE = 1,
  RIGHT = 2,
}

const pointerStateToType: Record<
  PointerState,
  'camera_drag_start' | 'camera_drag_end'
> = {
  [PointerState.DOWN]: 'camera_drag_start',
  [PointerState.UP]: 'camera_drag_end',
}

const pointerButtonToInteraction: Record<
  PointerButton,
  'rotatetrackball' | 'pan'
> = {
  [PointerButton.MIDDLE]: 'pan',
  [PointerButton.RIGHT]: 'rotatetrackball',
}

type WorkerMessage = {
  from: 'websocket',
  payload: {
    type: 'message',
    data: unknown
  }
} | {
  from: 'wasm',
  payload: {
    type: 'message',
    data: unknown
  }
}

type ZooClientArgs = { client: Client } & Parameters<
  typeof ModelingCommandsWs.urlConstructFrom
>
export class WebRTC extends EventTarget {
  private zooClientArgs: ZooClientArgs
  
  private rtcPeerConnection: RTCPeerConnection
  private workerWebRTC: Worker
  
  public track?: RTCTrackEvent
  public channel?: RTCDataChannel
  
  public removeMouseEvents: (() => void) = () => {}

  constructor(
    args: ZooClientArgs
  ) {
    super()

    this.zooClientArgs = args
    
    // Initialization is NOT resource acquisition here. The purpose of early
    // init is worker is available to hook up events to RTCPeerConnection events.
    // Devs must still call .start()
    this.workerWebRTC = new WorkerWebRTC()

    // Default topology for RTCPeerConnection
    this.rtcPeerConnection = new RTCPeerConnection({
      bundlePolicy: 'max-bundle',
    })

    // Add a transceiver to be included in our SDP offer
    this.rtcPeerConnection.addTransceiver('video', {
      direction: 'recvonly',
    })

    // Add a request for a data channel
    this.rtcPeerConnection.createDataChannel('unreliable_modeling_cmds')

    this.ice()

    this.rtcPeerConnection.addEventListener(
      'track',
      this.webRTCOnTrack.bind(this)
    )
    this.rtcPeerConnection.addEventListener(
      'datachannel',
      this.webRTCOnDataChannel.bind(this)
    )
    this.rtcPeerConnection.addEventListener(
      'connectionstatechange',
      this.webRTCOnConnectionStateChange.bind(this)
    )
  }

  deconstructor() {
    this.removeMouseEvents()
  
    this.deice()

    this.rtcPeerConnection.removeEventListener(
      'track',
      this.webRTCOnTrack.bind(this)
    )
    this.rtcPeerConnection.removeEventListener(
      'datachannel',
      this.webRTCOnDataChannel.bind(this)
    )
    this.rtcPeerConnection.removeEventListener(
      'connectionstatechange',
      this.webRTCOnConnectionStateChange.bind(this)
    )
  }
  
  start() {
    this.workerWebRTC.postMessage({
      to: 'worker',
      payload: {
        type: 'start',
        data: [ this.zooClientArgs ]
      }
    })
  }
 
  // For regular wasm calls, for whatever reason devs need it for. 
  // Alternatively they can load up a stand-alone wasm blob via
  // @kittycad/kcl-wasm-lib.
  wasm(funcName: string, ...args: unknown[]): Promise<unknown> {
    return new Promise((resolve) => {
      const onMessage = (ev: MessageEvent & WorkerMessage) => {
        if (ev.from === 'wasm') {
          this.workerWebRTC.removeEventListener('message', onMessage)
          resolve(ev.payload.data)
        }
      }
      
      this.workerWebRTC.addEventListener('message', onMessage)
      
      this.workerWebRTC.postMessage({
        to: 'wasm',
        payload: {
          type: funcName,
          data: args ?? []
        }
      })
    })      
  }
  
  prepareToExecuteKcl(kclStr: string) {
    return {
      addEventListener: this.workerWebRTC.addEventListener.bind(this.workerWebRTC, 'message'),
      remaddEventListener: this.workerWebRTC.removeEventListener.bind(this.workerWebRTC, 'message'),
      start: () => {
        this.workerWebRTC.postMessage({
          to: 'wasm',
          payload: {
            type: 'execute',
            data: [kclStr]
          }
        })
      }
    }
  }

  webRTCOnConnectionStateChange() {
    switch (this.rtcPeerConnection.connectionState) {
      case 'disconnected':
        this.dispatchEvent(new Event('close'))
        break
    }
  }

  // For now, only one stream.
  webRTCOnTrack(ev: RTCTrackEvent) {
    this.track = ev
    this.dispatchEvent(new Event('track'))
  }

  webRTCOnDataChannel(ev: RTCDataChannelEvent) {
    this.channel = ev.channel
    this.dispatchEvent(new Event('datachannel'))

    // The safest place to indicate that we can accept commands now
    this.dispatchEvent(new Event('connected'))
  }

  async iceOnIceServerInfo(
    msg: Extract<OkWebSocketResponseData, { type: 'ice_server_info' }>
  ) {
    // Expected in local engine setups.
    if (msg.data.ice_servers.length == 0) return

    // Expected topology in all other scenarios.
    this.rtcPeerConnection.setConfiguration({
      bundlePolicy: 'max-bundle',
      iceServers: msg.data.ice_servers,
      iceTransportPolicy: 'relay',
    })

    // Expected moment to send the `sdp_offer` which describes what capabilities
    // the machine has in terms of video streaming & network topology.
    // We will receive an sdp_answer saying what is compatible with the server.
    const rtcSessionDescription = await this.rtcPeerConnection.createOffer()
    await this.rtcPeerConnection.setLocalDescription(rtcSessionDescription)
    
    this.workerWebRTC.postMessage({
      to: 'websocket',
      payload: {
        type: 'send',
        data: [JSON.stringify({
          type: 'sdp_offer',
          offer: rtcSessionDescription,
        })]
      }
    })
  }

  async iceOnSdpAnswer(
    msg: Extract<OkWebSocketResponseData, { type: 'sdp_answer' }>
  ) {
    // This will kick off `trickle_ice`, since it's the final piece in knowing
    // which compatible candidates to serve us.
    await this.rtcPeerConnection.setRemoteDescription(
      msg.data.answer as RTCSessionDescription
    )
  }

  // Technically we don't need this, but in the future, our server and clients
  // may make better use of them. Because it's not much extra code we'll
  // leave the handlers here.
  async iceOnTrickleIce(
    msg: Extract<OkWebSocketResponseData, { type: 'trickle_ice' }>
  ) {
    await this.rtcPeerConnection.addIceCandidate(msg.data.candidate)
  }

  iceOnIceCandidate(ev: RTCPeerConnectionIceEvent) {
    // No more candidates, ICE gathering complete.
    if (ev.candidate === null) return

    this.workerWebRTC.postMessage({
      to: 'websocket',
      payload: {
        type: 'send',
        data: [JSON.stringify({
          type: 'trickle_ice',
          candidate: {
            candidate: ev.candidate.candidate,
            sdpMid: ev.candidate.sdpMid || undefined,
            sdpMLineIndex: ev.candidate.sdpMLineIndex || undefined,
            usernameFragment: ev.candidate.usernameFragment || undefined,
          },
        })]
      }
    })
  }

  iceOnMessage(ev: WorkerMessage['payload']) {
    const msg = ModelingCommandsWs.parseMessage(ev as MessageEvent)

    if (!('resp' in msg)) {
      return /* todo: emit error */
    }

    switch (msg.resp.type) {
      case 'ice_server_info':
        void this.iceOnIceServerInfo(msg.resp)
        break
      case 'sdp_answer':
        void this.iceOnSdpAnswer(msg.resp)
        break
      case 'trickle_ice':
        void this.iceOnTrickleIce(msg.resp)
        break
    }
  }
  
  workerWebRTCOnMessage(ev: MessageEvent<WorkerMessage>) {
    const msg = ev.data
    if (msg.from !== 'websocket') { return }
    if (msg.payload.type !== 'message') { return }
    this.iceOnMessage(msg.payload)
  }

  ice() {
    this.workerWebRTC.addEventListener('message', this.workerWebRTCOnMessage.bind(this))
    this.rtcPeerConnection.addEventListener(
      'icecandidate',
      this.iceOnIceCandidate.bind(this)
    )
  }

  deice() {
    this.workerWebRTC.removeEventListener('message', this.workerWebRTCOnMessage.bind(this))
    this.rtcPeerConnection.removeEventListener(
      'icecandidate',
      this.iceOnIceCandidate
    )
  }

  addMouseEvents(el: HTMLVideoElement) {
    let pointerState = PointerState.UP
    let pointerButton: PointerButton | undefined = undefined

    const onPointerState =
      (targetPointerState: PointerState) => (ev: PointerEvent) => {
        const interaction = pointerButtonToInteraction[ev.button]
        if (interaction === undefined) {
          return
        }

        this.workerWebRTC.postMessage({
          to: 'websocket',
          payload: {
            type: 'send',
            data: [JSON.stringify({
              type: 'modeling_cmd_req',
              cmd_id: '00000000-0000-0000-0000-000000000000',
              cmd: {
                type: pointerStateToType[targetPointerState],
                interaction,
                window: {
                  x: ev.offsetX,
                  y: ev.offsetY,
                },
              },
            })]
          }
        })

        pointerButton = ev.button
        pointerState = targetPointerState
      }

    const onPointerDown = onPointerState(PointerState.DOWN)
    const onPointerUp = onPointerState(PointerState.UP)
    const onPointerLeave = onPointerUp

    let sequence = 0

    const onPointerMove = (ev: PointerEvent) => {
      if (pointerState === PointerState.DOWN) {
        this.channel?.send(
          JSON.stringify({
            type: 'modeling_cmd_req',
            cmd_id: '00000000-0000-0000-0000-000000000000',
            cmd: {
              type: 'camera_drag_move',
              interaction: pointerButtonToInteraction[pointerButton],
              window: {
                x: ev.offsetX,
                y: ev.offsetY,
              },
            },
          })
        )
      }

      // Let's increment before, since `send` could technically fail
      sequence += 1

      // Always report the movement to the server, since highlighting depends
      // on the current mouse position.
      this.channel?.send(
        JSON.stringify({
          type: 'modeling_cmd_req',
          cmd_id: '00000000-0000-0000-0000-000000000000',
          cmd: {
            type: 'mouse_move',
            sequence,
            window: {
              x: ev.offsetX,
              y: ev.offsetY,
            },
          },
        })
      )
    }

    const onDataChannel = (event: RTCDataChannelEvent) => {
      this.channel = event.channel
      el.addEventListener('pointerdown', onPointerDown)
      el.addEventListener('pointermove', onPointerMove)
      el.addEventListener('pointerup', onPointerUp)
      el.addEventListener('pointerleave', onPointerLeave)
    }

    this.rtcPeerConnection.addEventListener('datachannel', onDataChannel)
    
    this.removeMouseEvents = () => {
      this.rtcPeerConnection.removeEventListener('datachannel', onDataChannel)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
    }
  }

  // In the future this could be over WebRTC channels.
  send(...args: Parameters<WebSocket['send']>) {
    this.workerWebRTC.postMessage({
      to: 'websocket',
      payload: {
        type: 'send',
        data: args
      }
    })
  }
}
