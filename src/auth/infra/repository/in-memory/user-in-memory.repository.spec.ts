import { UserInMemoryRepository } from './user-in-memory.repository';

describe('UserInMemoryRepository', () => {
  let userRepository: UserInMemoryRepository;
  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
  });

  it('should be get userRO by email', async () => {
    userRepository['users'] = [
      {
        id: '1',
        email: 'test@mail.com',
        role: {
          name: 'admin',
          permissions: [{ name: 'read:property' }, { name: 'write:property' }],
        },
      },
    ];
    const user = await userRepository.getUser({ email: 'test@mail.com' });
    expect(user).toBeDefined();
  });
});
