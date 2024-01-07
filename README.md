# KittyCAD JS/TS API library

Fully typed js library, compatible with js and ts.

### [Full documentation here](https://zoo.dev/docs/api?lang=typescript)

Simple example below.

### Install

```bash
npm install @kittycad/lib
# or
yarn add @kittycad/lib

## set your token
export KITTYCAD_TOKEN=<your token>
```

### Basic example
```typescript
import { file } from '@kittycad/lib';
import fsp from 'fs/promises';

async function main() {
    // kittycad.io/docs/api/get-cad-file-mass?lang=typescript
    const response = await file.create_file_mass({
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

