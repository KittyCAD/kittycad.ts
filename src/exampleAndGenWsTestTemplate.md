```typescript
import { api } from '../../src/index.js';

async function example() {
  const response = await api.section({ param: 'param' }).connect();
  response.close();
  return true;
}

describe('Testing WS api.section', () => {
  it('connects and closes', async () => {
    expect(await example()).toBeTruthy();
  });
});
```
