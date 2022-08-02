![image](https://user-images.githubusercontent.com/19377312/165883233-3bdbc9fb-ddf9-4173-8cf2-d1b70ab7127d.png)

# KittyCAD JS/TS API library

`Socials::` - [blog](https://kittycad.io/blog) • [twitter](http://twitter.com/kittycadinc) • [linkedin](https://linkedin.com/company/kittycad) • [instagram](http://instagram.com/kittycadinc) • [youtube](https://www.youtube.com/channel/UCe_nbF3CBjbQRZoH_4xuNJA) • [discord](https://discord.com/invite/Bee65eqawJ) 

## WIP, docs will be added to [kittycad.io/docs](https://kittycad.io/docs/api) soon

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
import type { Models } from '@kittycad/lib';
import fsp from 'fs/promises';

async function main() {
    const { status, mass } = (await file.create_file_mass({
        src_format: 'obj',
        material_density: '0.007',
        body: await fsp.readFile('./example.obj', 'base64'),
    })) as Models['FileMass_type'];

    console.log(status, mass);
}

main();
```

