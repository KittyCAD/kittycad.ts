import { file } from '../src/index.js';
import type { Models } from '../src/index.js';
import fsp from 'fs/promises';

describe('Testing create_file_execution', () => {
  it("shouldn't throw", async () => {
    const { stderr, stdout, output_files } = (await file.create_file_execution({
      lang: 'go',
      output: 'output.stl',
      body: await fsp.readFile('./exampleGoScript.go', 'base64'),
    })) as Models['CodeOutput_type'];
    expect(stderr).toBe('');
    expect(stdout).toBe(
      [
        'File conversion id:  bdbf2969-8015-448b-a237-841d421fd1fe',
        'File conversion status:  Completed',
        'Saving output to  ./output.stl\n',
      ].join('\n'),
    );
    expect(output_files[0].contents).toHaveLength(191308);

    expect(true).toBe(true);
  });
});
describe('Testing create_file_mass', () => {
  it("shouldn't throw", async () => {
    const { status, mass } = (await file.create_file_mass({
      src_format: 'obj',
      material_density: '0.007',
      body: await fsp.readFile('./example.obj', 'base64'),
    })) as Models['FileMass_type'];
    expect(mass).toBe(0.7063786);
    expect(status).toBe('Completed');

    expect(true).toBe(true);
  });
});
