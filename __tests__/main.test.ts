import { file } from '../src/index.js';
import fsp from 'fs/promises';
import { CodeOutput_type } from '../src/models.js';

describe('Testing create_file_execution', () => {
  it("shouldn't throw", async () => {
    const { stderr, stdout, output_files } = (await file.create_file_execution({
      lang: 'go',
      output: 'output.stl',
      body: await fsp.readFile('./exampleGoScript.go', 'base64'),
    })) as CodeOutput_type;
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
