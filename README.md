# KittyCAD JS/TS API library

Fully typed js library, compatible with js and ts.

**Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for how to to publish AND
AN EXPLANATION BEHIND THE DERIVATION PROCESS!**

### [Full documentation here](https://zoo.dev/docs/api?lang=typescript)

### Install

```bash
npm install @kittycad/lib
# or
yarn add @kittycad/lib

## set your token
export ZOO_API_TOKEN=<your token>
```

### Basic example
```typescript
import { Client, file } from '@kittycad/lib';
import fsp from 'fs/promises';

async function main() {
    const client = new Client()
    // zoo.dev/docs/api/get-cad-file-mass?lang=typescript
    const response = await file.create_file_mass({
      client,
      src_format: 'obj',
      material_density_unit: 'kg:m3',
      output_unit: 'g',
      material_density: 0.007,
      body: await fsp.readFile('./example.obj', 'base64'),
    })
    if ('error_code' in response) throw 'error'

    const { status, mass } = response
    console.log(status, mass);
}

main();
```

### Collection compatibility

GET calls that return an array keep returning the complete array. They accept
either a legacy array or Dropshot `{ items, next_page }` responses, following
opaque `page_token` cursors until `next_page` is `null`. `meta.get_announcements`
also accepts its legacy envelope and keeps returning `{ announcements }`.
These calls reject failed or malformed pages, cursor loops, and response-format
changes without returning a partial collection.

```typescript
import { Client, projects } from '@kittycad/lib';

const client = new Client({ token: 'your-token', fetch });
const controller = new AbortController();
const allProjects = await projects.list_projects({
  client,
  signal: controller.signal,
});
```

Every page uses the client's configured `baseUrl` and `fetch`, including any
authentication or cookie handling supplied by that transport. `signal` cancels
the entire traversal. Existing calls returning a `ResultsPage` still return one
page; use their `<operationId>_pager` helpers to request subsequent pages.

For a custom HTTP reader, the exported `collectApiList<Item>(absoluteUrl,
readPage, legacyListField?)` handles the same traversal. The reader must reject
HTTP failures and return the parsed response body. This compatibility is based
on the current SDK return types; a future OpenAPI change to those types still
needs a coordinated SDK release and caller migration.
