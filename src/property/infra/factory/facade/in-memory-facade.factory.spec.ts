import { PropertyFacade } from '#property/app';
import { InMemoryFacadeFactory } from './in-memory-facade.factory';

describe('InMemoryFacadeFactory unit tests', () => {
  it('should create a facade', async () => {
    const facade = InMemoryFacadeFactory.create({
      req_id: '123',
      req_path: 'path',
      req_method: 'method',
      req_ua: 'ua',
    });
    expect(facade).toBeInstanceOf(PropertyFacade);
    expect(facade).toHaveProperty('createProperty');
    expect(facade).toHaveProperty('getProperty');
    expect(facade).toHaveProperty('searchProperty');
  });
});
