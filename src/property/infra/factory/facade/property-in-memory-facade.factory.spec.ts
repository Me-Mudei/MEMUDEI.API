import { PropertyFacade } from '#property/app';
import { PropertyInMemoryFacadeFactory } from './property-in-memory-facade.factory';

describe('PropertyInMemoryFacadeFactory unit tests', () => {
  it('should create a facade', async () => {
    const facade = PropertyInMemoryFacadeFactory.create();
    expect(facade).toBeInstanceOf(PropertyFacade);
    expect(facade).toHaveProperty('createProperty');
    expect(facade).toHaveProperty('updateProperty');
    expect(facade).toHaveProperty('getProperty');
    expect(facade).toHaveProperty('searchProperty');
  });
});
