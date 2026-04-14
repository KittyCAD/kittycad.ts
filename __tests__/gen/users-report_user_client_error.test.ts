import { users, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await users.report_user_client_error({
    body: {
      client:
        'Stable identifier for the client application reporting the error.',
      code: 'Optional application-defined error code or fingerprint.',
      error_name: 'Optional JavaScript/runtime error name.',
      message: 'Human-readable error message.',
      release: 'Client release/version string.',
      route: 'Optional route/path where the error occurred.',
      stack: 'Optional stack trace or equivalent debug context.',
    },
    client,
  })
  return response
}

describe('Testing users.report_user_client_error', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
