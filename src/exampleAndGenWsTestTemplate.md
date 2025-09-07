```typescript
import { api } from '../../src/index.js';

async function example() {
  const response = await api.section.connect({ param: 'param' });
  response.close();
  return true;
}

describe('Testing WS api.section', () => {
  it('connects and closes', async () => {
    expect(await example()).toBeTruthy();
  });
});
```
