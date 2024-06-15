import { MakesProxy } from './makes.proxy';

describe('Makes Proxy', () => {
  let makesProxy: MakesProxy;

  beforeEach(() => {
    makesProxy = new MakesProxy();
  });

  it('Get all makes', async () => {
    const response = await makesProxy.getAll();
    expect(response.length).toEqual(11350);
  });
});
