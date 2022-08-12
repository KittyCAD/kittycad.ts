```typescript
import { api } from '../../src/index.js';

async function example() {
  const response = await api.section({ param: 'param' });
  if ('error_code' in response) throw response;
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing api.section', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
```
