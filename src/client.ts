import 'cross-fetch/polyfill';

export class Client {
  constructor(readonly token: string) {
    this.token = token;
  }
}
