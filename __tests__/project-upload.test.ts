import { vi } from 'vitest'
import { Client } from '../src/client'
import createProject from '../src/api/projects/create_project'
import updateProject from '../src/api/projects/update_project'

it.each(['main.kcl', 'parts/空 😀 é.bin'])(
  'preserves multipart filename %s, bytes, and JSON revision metadata',
  async (name) => {
    const bytes = new Uint8Array([0, 255, 128, 65])
    const metadata = {
      title: 'Bracket',
      expected_revision: 'revision-1',
      deleted_paths: ['obsolete.kcl'],
    }
    const request = vi.fn<typeof fetch>(async (_input, init) => {
      expect(init.body).toBeInstanceOf(FormData)
      if (!(init.body instanceof FormData)) throw new Error('Missing form data')
      const file = init.body.get(name)
      if (!(file instanceof File)) throw new Error('Missing file')
      expect(file.name).toBe(name)
      expect(new Uint8Array(await file.arrayBuffer())).toEqual(bytes)
      const body = init.body.get('body')
      if (!(body instanceof Blob)) throw new Error('Missing metadata')
      expect(JSON.parse(await body.text())).toEqual(metadata)
      return Response.json({ id: 'one', revision: 'revision-2' })
    })
    const client = new Client({ fetch: request })
    const files = [
      {
        name: 'body',
        data: new Blob([JSON.stringify(metadata)], {
          type: 'application/json',
        }),
      },
      { name, data: new Blob([bytes]) },
    ]
    await expect(createProject({ client, files })).resolves.toMatchObject({
      id: 'one',
    })
    await expect(
      updateProject({ client, files, id: 'one' })
    ).resolves.toMatchObject({ revision: 'revision-2' })
    expect(request).toHaveBeenCalledTimes(2)
  }
)
