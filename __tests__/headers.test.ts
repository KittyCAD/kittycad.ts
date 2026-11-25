import { vi } from 'vitest'
import { Client } from '../src/client'
import createExecutionJob from '../src/api/executor/create_execution_job'
import createProjectVersion from '../src/api/projects/create_project_version'

it('sends the execution idempotency key as a header, not a query parameter', async () => {
  const body = {
    command: ['echo', 'hello'],
    compute_profile_id: 'small',
    runtime_id: 'node',
    environment: {},
    inputs: [],
    outputs: [],
    timeout_seconds: 7,
  }
  const request = vi.fn<typeof fetch>(async (url, init) => {
    expect(url).toBe('https://sdk.example.test/execution/jobs')
    expect(init?.method).toBe('POST')
    expect(new Headers(init?.headers).get('Idempotency-Key')).toBe('job-1')
    expect(new Headers(init?.headers).get('Content-Type')).toBe(
      'application/json'
    )
    expect(init?.body).toBe(JSON.stringify(body))
    return Response.json({ id: 'job-1' })
  })
  const client = new Client({
    baseUrl: 'https://sdk.example.test',
    fetch: request,
  })

  await createExecutionJob({ client, idempotency_key: 'job-1', body })
  expect(request).toHaveBeenCalledTimes(1)
})

it.each([undefined, 'save-1'])(
  'preserves multipart uploads with optional idempotency key %s',
  async (idempotency_key) => {
    const metadata = { expected_revision: 'revision-1' }
    const bytes = new Uint8Array([0, 255, 128, 65])
    const request = vi.fn<typeof fetch>(async (url, init) => {
      expect(url).toBe(
        'https://sdk.example.test/user/projects/project-1/versions'
      )
      const headers = new Headers(init?.headers)
      expect(headers.get('Idempotency-Key')).toBe(idempotency_key ?? null)
      expect(headers.has('Content-Type')).toBe(false)
      if (!(init?.body instanceof FormData))
        throw new Error('Missing form data')
      const body = init.body.get('body')
      if (!(body instanceof Blob)) throw new Error('Missing metadata')
      expect(JSON.parse(await body.text())).toEqual(metadata)
      const file = init.body.get('part.bin')
      if (!(file instanceof File)) throw new Error('Missing file')
      expect(new Uint8Array(await file.arrayBuffer())).toEqual(bytes)
      return Response.json({ id: 'version-1' })
    })
    const client = new Client({
      baseUrl: 'https://sdk.example.test',
      fetch: request,
    })

    await createProjectVersion({
      client,
      id: 'project-1',
      idempotency_key,
      files: [
        { name: 'body', data: new Blob([JSON.stringify(metadata)]) },
        { name: 'part.bin', data: new Blob([bytes]) },
      ],
    })
    expect(request).toHaveBeenCalledTimes(1)
  }
)
