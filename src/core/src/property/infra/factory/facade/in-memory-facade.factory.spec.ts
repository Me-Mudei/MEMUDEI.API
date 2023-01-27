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
    expect(facade).toHaveProperty('getPropertyType');
    expect(facade).toHaveProperty('searchPropertyType');
    expect(facade).toHaveProperty('createPropertyType');
    expect(facade).toHaveProperty('updatePropertyType');
    expect(facade).toHaveProperty('deletePropertyType');
    expect(facade).toHaveProperty('getPropertyRelationship');
    expect(facade).toHaveProperty('searchPropertyRelationship');
    expect(facade).toHaveProperty('createPropertyRelationship');
    expect(facade).toHaveProperty('updatePropertyRelationship');
    expect(facade).toHaveProperty('deletePropertyRelationship');
    expect(facade).toHaveProperty('getPrivacyType');
    expect(facade).toHaveProperty('searchPrivacyType');
    expect(facade).toHaveProperty('createPrivacyType');
    expect(facade).toHaveProperty('updatePrivacyType');
    expect(facade).toHaveProperty('deletePrivacyType');
    expect(facade).toHaveProperty('getPropertyDetail');
    expect(facade).toHaveProperty('searchPropertyDetail');
    expect(facade).toHaveProperty('createPropertyDetail');
    expect(facade).toHaveProperty('updatePropertyDetail');
    expect(facade).toHaveProperty('deletePropertyDetail');
    expect(facade).toHaveProperty('getCondominiumDetail');
    expect(facade).toHaveProperty('searchCondominiumDetail');
    expect(facade).toHaveProperty('createCondominiumDetail');
    expect(facade).toHaveProperty('updateCondominiumDetail');
    expect(facade).toHaveProperty('deleteCondominiumDetail');
    expect(facade).toHaveProperty('getRule');
    expect(facade).toHaveProperty('searchRule');
    expect(facade).toHaveProperty('createRule');
    expect(facade).toHaveProperty('updateRule');
    expect(facade).toHaveProperty('deleteRule');
  });
});
