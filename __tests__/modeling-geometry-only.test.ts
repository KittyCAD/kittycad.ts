import { describe, expect, it } from 'vitest'
import ModelingCommandsWs from '../src/api/modeling/modeling_commands_ws'

describe('geometry-only session intent', () => {
  it.each([true, false, undefined])(
    'preserves geometry_only=%s',
    (geometry_only) => {
      const url = ModelingCommandsWs.urlConstructFrom({
        geometry_only,
        webrtc: false,
      })
      expect(url.searchParams.get('geometry_only')).toBe(
        geometry_only === undefined ? null : String(geometry_only)
      )
      expect(url.searchParams.get('webrtc')).toBe('false')
      expect(url.searchParams.has('post_effect')).toBe(false)
      expect(url.searchParams.has('video_res_width')).toBe(false)
      expect(url.searchParams.has('video_res_height')).toBe(false)
    }
  )

  it('does not opt rendered callers into geometry-only mode', () => {
    const url = ModelingCommandsWs.urlConstructFrom({
      webrtc: false,
      post_effect: 'ssao',
    })
    expect(url.searchParams.has('geometry_only')).toBe(false)
    expect(url.searchParams.get('post_effect')).toBe('ssao')
  })
})
