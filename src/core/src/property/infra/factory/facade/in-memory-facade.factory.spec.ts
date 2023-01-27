import { PropertyFacade } from '#property/app';
import { InMemoryFacadeFactory } from './in-memory-facade.factory';

describe('InMemoryFacadeFactory unit tests', () => {
  let facade: PropertyFacade;
  beforeEach(() => {
    facade = new InMemoryFacadeFactory({
      req_id: '123',
      req_path: 'path',
      req_method: 'method',
      req_ua: 'ua',
    }).create();
  });

  it('should create a facade', async () => {
    const search = await facade.searchProperty({});
    expect(facade).toBeDefined();
  });
});
