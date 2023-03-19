import { InMemoryFacadeFactory } from './in-memory-facade.factory';

describe('InMemoryFacadeFactory Unit tests', () => {
  it('should create a user facade', async () => {
    const facade = InMemoryFacadeFactory.create({
      req_id: 'test',
      req_path: 'test',
      req_method: 'test',
      req_ua: 'test',
    });
    const spyFacadeCreate = jest.spyOn(facade, 'createUser');
    await facade.createUser({
      name: 'Test',
      email: 'tes@test.com',
      role_name: 'TEST',
    });
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
  });
});
