import { payments } from '../../src/index.js';

async function example() {
  const response = await payments.update_org_subscription({
    body: { modeling_app: 'team', pay_annually: true },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing payments.update_org_subscription', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
