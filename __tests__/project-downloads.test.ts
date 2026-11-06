import { ApiError, Client, projects } from '@kittycad/lib'
import { describe, expect, it } from 'vitest'

describe('project downloads', () => {
  it('returns the unread archive response with its headers', async () => {
    const archive = new Uint8Array([0x50, 0x4b, 0x03, 0x04])
    const response = new Response(archive, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="project.zip"',
      },
    })
    const client = new Client({ fetch: async () => response })

    const result: Response = await projects.download_public_project({
      client,
      id: '00000000-0000-4000-8000-000000000001',
      format: 'zip',
    })

    expect(result).toBe(response)
    expect(result.bodyUsed).toBe(false)
    expect(result.headers.get('Content-Disposition')).toBe(
      'attachment; filename="project.zip"'
    )
    expect(new Uint8Array(await result.arrayBuffer())).toEqual(archive)
  })

  it('throws ApiError for a JSON error response', async () => {
    const body = {
      error_code: 'InvalidProjectFileSelection',
      message: 'Requested file is missing',
      request_id: 'request-id',
      missing_file_ids: ['00000000-0000-4000-8000-000000000002'],
    }
    const client = new Client({
      fetch: async () => Response.json(body, { status: 400 }),
    })

    await expect(
      projects.download_public_project({
        client,
        id: '00000000-0000-4000-8000-000000000001',
        format: 'zip',
      })
    ).rejects.toMatchObject({
      constructor: ApiError,
      status: 400,
      body,
    })
  })
})
