import { describe, expect, it } from 'vitest'
import ModelingCommandsWs from '../src/api/modeling/modeling_commands_ws'

describe('modeling pool selection', () => {
  it.each(['cpu', 'default', undefined])(
    'preserves pool=%s and explicit webrtc=false',
    (pool) => {
      const url = ModelingCommandsWs.urlConstructFrom({ pool, webrtc: false })
      expect(url.searchParams.get('pool')).toBe(pool ?? null)
      expect(url.searchParams.get('webrtc')).toBe('false')
      for (const name of [
        'geometry_only',
        'post_effect',
        'video_res_width',
        'video_res_height',
      ]) {
        expect(url.searchParams.has(name)).toBe(false)
      }
    }
  )
  it('preserves rendered callers', () => {
    const url = ModelingCommandsWs.urlConstructFrom({
      pool: 'default',
      webrtc: true,
      post_effect: 'ssao',
    })
    expect(url.searchParams.get('pool')).toBe('default')
    expect(url.searchParams.get('webrtc')).toBe('true')
    expect(url.searchParams.get('post_effect')).toBe('ssao')
  })
})
