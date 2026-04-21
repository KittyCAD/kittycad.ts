import { Client } from './client'
import ModelingCommandsWs from './api/modeling/modeling_commands_ws'
import {
  OkWebSocketResponseData,
  SuccessWebSocketResponse,
  FailureWebSocketResponse,
} from './models'
import WorkerWebRTC from 'web-worker:./worker-webrtc.ts'

type ExpectedWebSocketResponse =
  | FailureWebSocketResponse
  | SuccessWebSocketResponse
  | Error

// Based on human interaction speeds.
const throttle = (
  functionToThrottleCallsTo: (...args: unknown[]) => void,
  timeMs: number
) => {
  let queuedArgs = undefined

  const intervalId = setInterval(() => {
    if (queuedArgs === undefined) return
    const clonedArgs = queuedArgs
    queuedArgs = undefined
    window.requestAnimationFrame(() => {
      functionToThrottleCallsTo(...clonedArgs)
    })
  }, timeMs)

  return {
    fn: (...args: unknown[]) => {
      queuedArgs = args
    },
    intervalId,
  }
}

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

type WorkerMessage =
  | {
      from: 'websocket'
      payload: {
        type: 'message'
        data: unknown
      }
    }
  | {
      to: 'websocket'
      payload: {
        type: 'send'
        data: unknown
      }
    }
  | {
      from: 'wasm'
      payload:
        | {
            type: 'message'
            data: unknown
          }
        | {
            type: 'execute'
            data: unknown
          }
    }

// Make sure we tie our arguments to the WebSocket initializer's parameters.
type ZooClientArgs = { client: Client } & Parameters<
  typeof ModelingCommandsWs.urlConstructFrom
>[0]

export class WebRTC extends EventTarget {
  private zooClientArgs: ZooClientArgs

  private rtcPeerConnection: RTCPeerConnection
  private workerWebRTC: Worker

  public track?: RTCTrackEvent
  public channel?: RTCDataChannel

  public removeMouseEvents: () => void = () => {}
  public removeResizeObserver: () => void = () => {}

  constructor(args: ZooClientArgs) {
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
    this.removeResizeObserver()

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

    this.workerWebRTC.terminate()
    this.rtcPeerConnection.close()
  }

  start() {
    this.workerWebRTC.postMessage({
      to: 'worker',
      payload: {
        type: 'start',
        data: [this.zooClientArgs],
      },
    })
  }

  // For regular wasm calls, for whatever reason devs need it for.
  // Alternatively they can load up a stand-alone wasm blob via
  // @kittycad/kcl-wasm-lib.
  wasm(funcName: string, ...args: unknown[]): Promise<unknown> {
    return new Promise((resolve) => {
      const onMessage = (ev: MessageEvent<WorkerMessage>) => {
        const msg = ev.data
        if ('from' in msg && msg.from === 'wasm') {
          this.workerWebRTC.removeEventListener('message', onMessage)
          resolve(msg.payload.data)
        }
      }

      this.workerWebRTC.addEventListener('message', onMessage)

      this.workerWebRTC.postMessage({
        to: 'wasm',
        payload: {
          type: funcName,
          data: args ?? [],
        },
      })
    })
  }

  executor() {
    return {
      addEventListener: this.workerWebRTC.addEventListener.bind(
        this.workerWebRTC,
        'message'
      ),
      removeEventListener: this.workerWebRTC.removeEventListener.bind(
        this.workerWebRTC,
        'message'
      ),
      submit: (
        kclStr: string,
        opts = { mainKclPathName: 'main.kcl' }
      ): Promise<ExpectedWebSocketResponse> =>
        new Promise((resolve) => {
          const onMessage = (ev: MessageEvent<WorkerMessage>) => {
            const msg = ev.data
            if (
              'from' in msg &&
              // It's initiated from the wasm, but the very very root is the websocket.
              msg.from === 'wasm' &&
              msg.payload.type === 'execute'
            ) {
              this.workerWebRTC.removeEventListener('message', onMessage)
              resolve(msg.payload.data as ExpectedWebSocketResponse)
            }
          }
          this.workerWebRTC.addEventListener('message', onMessage)

          this.workerWebRTC.postMessage({
            to: 'wasm',
            payload: {
              type: 'execute',
              data: [kclStr, opts],
            },
          })
        }),
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
        data: [
          JSON.stringify({
            type: 'sdp_offer',
            offer: rtcSessionDescription,
          }),
        ],
      },
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
        data: [
          JSON.stringify({
            type: 'trickle_ice',
            candidate: {
              candidate: ev.candidate.candidate,
              sdpMid: ev.candidate.sdpMid || undefined,
              sdpMLineIndex: ev.candidate.sdpMLineIndex || undefined,
              usernameFragment: ev.candidate.usernameFragment || undefined,
            },
          }),
        ],
      },
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
    if (!('from' in msg)) {
      return
    }
    if (msg.from !== 'websocket') {
      return
    }
    if (msg.payload.type !== 'message') {
      return
    }
    this.iceOnMessage(msg.payload)
  }

  ice() {
    this.workerWebRTC.addEventListener(
      'message',
      this.workerWebRTCOnMessage.bind(this)
    )
    this.rtcPeerConnection.addEventListener(
      'icecandidate',
      this.iceOnIceCandidate.bind(this)
    )
  }

  deice() {
    this.workerWebRTC.removeEventListener(
      'message',
      this.workerWebRTCOnMessage.bind(this)
    )
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
            data: [
              JSON.stringify({
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
              }),
            ],
          },
        })

        pointerButton = ev.button
        pointerState = targetPointerState
      }

    const onPointerDown = onPointerState(PointerState.DOWN)
    const onPointerUp = onPointerState(PointerState.UP)
    const onPointerLeave = (ev: PointerEvent) => {
      const interaction = pointerButtonToInteraction[pointerButton]
      if (interaction === undefined) {
        return
      }

      pointerState = PointerState.UP

      this.workerWebRTC.postMessage({
        to: 'websocket',
        payload: {
          type: 'send',
          data: [
            JSON.stringify({
              type: 'modeling_cmd_req',
              cmd_id: '00000000-0000-0000-0000-000000000000',
              cmd: {
                type: pointerStateToType[pointerState],
                interaction,
                window: {
                  x: ev.offsetX,
                  y: ev.offsetY,
                },
              },
            }),
          ],
        },
      })
    }

    let sequence = 0

    const onPointerMove = throttle((ev: PointerEvent) => {
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
    }, 1000 / 30)

    const onMouseWheel = throttle((ev: WheelEvent) => {
      ev.preventDefault()
      this.channel?.send(
        JSON.stringify({
          type: 'modeling_cmd_req',
          cmd_id: '00000000-0000-0000-0000-000000000000',
          cmd: {
            type: 'default_camera_zoom',
            magnitude: Math.sign(ev.deltaY) * -1 * window.devicePixelRatio * 50,
          },
        })
      )
    }, 1000 / 30)

    const onDataChannel = (event: RTCDataChannelEvent) => {
      this.channel = event.channel
      el.addEventListener('pointerdown', onPointerDown)
      el.addEventListener('pointermove', onPointerMove.fn)
      el.addEventListener('pointerup', onPointerUp)
      el.addEventListener('pointerleave', onPointerLeave)
      el.addEventListener('wheel', onMouseWheel.fn, { passive: false })
    }

    this.rtcPeerConnection.addEventListener('datachannel', onDataChannel)

    this.removeMouseEvents = () => {
      this.rtcPeerConnection.removeEventListener('datachannel', onDataChannel)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove.fn)
      clearInterval(onPointerMove.intervalId)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointerleave', onPointerLeave)
      el.removeEventListener('wheel', onMouseWheel.fn)
      clearInterval(onMouseWheel.intervalId)
    }
  }

  resize(args: { width: number; height: number }) {
    window.requestAnimationFrame(() => {
      this.send(
        JSON.stringify({
          type: 'modeling_cmd_req',
          cmd_id: '00000000-0000-0000-0000-000000000000',
          cmd: {
            type: 'reconfigure_stream',
            ...args,
            fps: 30,
          },
        })
      )
    })
  }

  addResizeObserver(el: HTMLElement) {
    const elVideo = el.querySelector<HTMLVideoElement>('video')

    const onResize = throttle((entries: ResizeObserverEntry[]) => {
      // There'll only ever be 1, but this is safer.
      for (const entry of entries) {
        const width = entry.contentRect.width - (entry.contentRect.width % 4)
        const height = entry.contentRect.height - (entry.contentRect.height % 4)

        elVideo.width = width
        elVideo.height = height

        this.resize({ width, height })
      }
    }, 1000 / 16)

    const observerResize = new ResizeObserver(onResize.fn)
    observerResize.observe(el)
    this.removeResizeObserver = () => {
      clearInterval(onResize.intervalId)
      observerResize.disconnect()
    }
  }

  // In the future this could be over WebRTC channels.
  send(
    ...args: Parameters<WebSocket['send']>
  ): Promise<ExpectedWebSocketResponse> {
    return new Promise((resolve) => {
      const onMessage = (ev: MessageEvent<WorkerMessage>) => {
        const msg = ev.data
        if ('from' in msg && msg.from === 'websocket') {
          this.workerWebRTC.removeEventListener('message', onMessage)
          resolve(msg.payload.data as ExpectedWebSocketResponse)
        }
      }

      this.workerWebRTC.addEventListener('message', onMessage)

      this.workerWebRTC.postMessage({
        to: 'websocket',
        payload: {
          type: 'send',
          data: args,
        },
      })
    })
  }
}
