import { modeling, Client } from '../../src/index.js';

async function example() {
  const response = await new modeling.modeling_commands_ws({
    client: new Client(process.env.KITTYCAD_TOKEN),
    api_call_id: 'string',
    fps: 7,
    pool: 'string',
    post_effect: 'ssao',
    replay: 'string',
    show_grid: true,
    unlocked_framerate: true,
    video_res_height: 7,
    video_res_width: 7,
    webrtc: true,
  }).connect();
  response.close();
  return true;
}

describe('Testing WS modeling.modeling_commands_ws', () => {
  it('connects and closes', async () => {
    expect(await example()).toBeTruthy();
  });
});
