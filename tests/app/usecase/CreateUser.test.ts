import { PrismaClient } from '@prisma/client';
import CreateUser from '../../../src/app/usecase/create_user/CreateUser';
import { CreateUserInput } from '../../../src/app/usecase/create_user/ICreateUser';
import UserPrismaRepository from '../../../src/infra/repository/UserPrismaRepository';
import PrismaTestContext from '../../__helpers';

let db: PrismaClient;
const prismaCtx = new PrismaTestContext();

beforeEach(async () => {
  db = await prismaCtx.before();
});

afterEach(async () => {
  await prismaCtx.after();
});

test('Should be able to create a user', async () => {
  const user = new CreateUser(new UserPrismaRepository(db));
  const input: CreateUserInput = {
    name: 'John Doe',
    email: 'jhon.doe@mail.com',
    phone: '+5511999999999',
    born: '2020-01-01',
    cpf: '04513038578',
    gender: 'M',
    password: '123455',
    roleName: 'LESSEE',
    address: {
      street: 'Rua dos bobos',
      number: '123',
      country: 'Brasil',
      zipCode: '46900000',
      neighborhood: 'Bairro',
      complement: 'Complemento',
    },
  };
  const result = await user.execute(input);
  expect(result.status).toBe('USER_CREATED');
});
