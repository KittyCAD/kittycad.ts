import { vi } from 'vitest'
import { Client } from '../src/client'
import downloadProject from '../src/api/projects/download_project'
import downloadPublicProject from '../src/api/projects/download_public_project'
import downloadProjectVersion from '../src/api/projects/download_project_version'
import getProjectThumbnail from '../src/api/projects/get_project_thumbnail'
import getPublicProjectThumbnail from '../src/api/projects/get_public_project_thumbnail'
import getProjectVersionThumbnail from '../src/api/projects/get_project_version_thumbnail'
import downloadDatasetOriginal from '../src/api/orgs/download_org_dataset_conversion_original'
import downloadDatasetKcl from '../src/api/orgs/download_org_dataset_successful_kcl_bulk'
import getOrgFactoryJobFile from '../src/api/factory/get_org_factory_job_file'
import getUserFactoryJobFile from '../src/api/factory/get_user_factory_job_file'

const id = '00000000-0000-0000-0000-000000000001'
const version_id = '00000000-0000-0000-0000-000000000002'
const endpoints = [
  {
    name: 'dataset original',
    call: (client: Client) =>
      downloadDatasetOriginal({ client, id, conversion_id: version_id }),
  },
  {
    name: 'dataset KCL archive',
    call: (client: Client) => downloadDatasetKcl({ client, id }),
  },
  {
    name: 'organization Factory job file',
    call: (client: Client) =>
      getOrgFactoryJobFile({ client, job_id: id, file_id: version_id }),
  },
  {
    name: 'personal Factory job file',
    call: (client: Client) =>
      getUserFactoryJobFile({ client, job_id: id, file_id: version_id }),
  },
  {
    name: 'owner archive',
    call: (client: Client) => downloadProject({ client, id, format: 'zip' }),
  },
  {
    name: 'public archive',
    call: (client: Client) =>
      downloadPublicProject({ client, id, format: 'zip' }),
  },
  {
    name: 'version archive',
    call: (client: Client) =>
      downloadProjectVersion({ client, id, version_id, format: 'zip' }),
  },
  {
    name: 'owner thumbnail',
    call: (client: Client) => getProjectThumbnail({ client, id }),
  },
  {
    name: 'public thumbnail',
    call: (client: Client) => getPublicProjectThumbnail({ client, id }),
  },
  {
    name: 'version thumbnail',
    call: (client: Client) =>
      getProjectVersionThumbnail({ client, id, version_id }),
  },
]

describe.each(endpoints)('$name', ({ call }) => {
  it('preserves binary bytes and response headers without consuming the body', async () => {
    const bytes = new Uint8Array([0, 255, 128, 80, 75, 3, 4])
    const response = new Response(bytes, {
      headers: {
        'content-type': 'application/octet-stream',
        'content-disposition': 'attachment; filename="project.zip"',
      },
    })
    const client = new Client({ fetch: async () => response })
    const result = await call(client)
    expect(result).toBe(response)
    expect(result.bodyUsed).toBe(false)
    expect(result.headers.get('content-disposition')).toBe(
      'attachment; filename="project.zip"'
    )
    expect(new Uint8Array(await result.arrayBuffer())).toEqual(bytes)
  })

  it.each([400, 401, 404, 409, 429, 503])(
    'preserves HTTP %i errors before returning binary bodies',
    async (status) => {
      const client = new Client({
        fetch: async () =>
          Response.json(
            { message: 'Request failed', error_code: 'Conflict' },
            { status, headers: { 'Retry-After': '7' } }
          ),
      })
      await expect(call(client)).rejects.toMatchObject({
        status,
        message: 'Request failed',
        error_code: 'Conflict',
        retryAfterMs: 7000,
      })
    }
  )

  it('keeps a seven-second response pending and returns its late binary body', async () => {
    vi.useFakeTimers()
    try {
      const gate = Promise.withResolvers<Response>()
      const request = vi.fn(async () => gate.promise)
      const client = new Client({ fetch: request })
      const resolved = vi.fn()
      const pending = call(client).then(resolved)
      await vi.advanceTimersByTimeAsync(7000)
      expect(resolved).not.toHaveBeenCalled()
      expect(request).toHaveBeenCalledTimes(1)
      const response = new Response(new Uint8Array([255]))
      gate.resolve(response)
      await pending
      expect(resolved).toHaveBeenCalledWith(response)
      expect(new Uint8Array(await response.arrayBuffer())).toEqual(
        new Uint8Array([255])
      )
    } finally {
      vi.useRealTimers()
    }
  })
})
