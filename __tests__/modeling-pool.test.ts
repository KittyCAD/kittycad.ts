import { expect, it } from 'vitest'
import ModelingCommandsWs from '../src/api/modeling/modeling_commands_ws'

it('forwards CPU pool selection with WebRTC disabled', () => {
  const url = ModelingCommandsWs.urlConstructFrom({
    pool: 'cpu',
    webrtc: false,
  })
  expect(Object.fromEntries(url.searchParams)).toEqual({
    pool: 'cpu',
    webrtc: 'false',
  })
})
