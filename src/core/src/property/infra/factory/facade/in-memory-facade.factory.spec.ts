import { InMemoryFacadeFactory } from './in-memory-facade.factory';

describe('InMemoryFacadeFactory Unit tests', () => {
  it('should create a property facade', async () => {
    const facade = new InMemoryFacadeFactory({
      req_id: 'test',
      req_path: 'test',
      req_method: 'test',
      req_ua: 'test',
    }).create();
    const spyFacadeCreate = jest.spyOn(facade, 'createProperty');
    await facade.createProperty({
      name: 'Test',
      email: 'tes@test.com',
      role_name: 'TEST',
    });
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
  });
});
