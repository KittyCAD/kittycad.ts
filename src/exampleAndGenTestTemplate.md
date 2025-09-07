```typescript
import { api } from '../../src/index.js';

async function example() {
  const response = await api.section({ param: 'param' });
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing api.section', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
    try {
      await example();
    } catch (err) {
      // Only present in tests expected to throw
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(err).toBeInstanceOf(Error);
    }
    const examplePromise = example();
    const timeoutPromise = new Promise((r) =>
      setTimeout(() => r('timeout'), 450),
    );
    expect(await Promise.any([examplePromise, timeoutPromise])).toBe('timeout');
  });
});
```
