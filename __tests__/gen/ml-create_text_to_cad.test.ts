import { ml, ApiError } from '../../src/index.js'

async function example() {
  const response = await ml.create_text_to_cad({
    output_format: 'stl',
    kcl: true,
    body: {
      kcl_version:
        'The version of kcl to use. If empty, the latest version will be used.',
      model_version:
        'Zoo provided model, or custom model which should be used to process this request.',
      project_name:
        'The project name. This is used to tie the prompt to a project. Which helps us make our models better over time.',
      prompt: 'The prompt for the desired part.',
    },
  })
  return response
}

describe('Testing ml.create_text_to_cad', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
