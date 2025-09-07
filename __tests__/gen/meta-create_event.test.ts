import { ApiError, meta } from '../../src/index.js'

async function example() {
  const response = await meta.create_event({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
    body: {
      attachment_uri: 'Attachment URI for where the attachment is stored.',
      created_at: 'Time this event was created.',
      event_type: 'successful_compile_before_close',
      last_compiled_at: 'Time the associated attachment was last compiled.',
      project_description: 'Project descriptino as given by the user.',
      project_name: 'Project name as given by the user.',
      source_id:
        'The source app for this event, uuid that is unique to the app.',
      type: 'modeling_app_event',
      user_id: 'An anonymous user id generated client-side.',
    },
  })
  return response
}

describe('Testing meta.create_event', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
