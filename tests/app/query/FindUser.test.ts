import { PrismaClient } from '@prisma/client';
import CreateUser from '../../../src/app/usecase/create_user/CreateUser';
import { CreateUserInput } from '../../../src/app/usecase/create_user/ICreateUser';
import FindUser from '../../../src/app/query/find_user/FindUser';
import PrismaRepositoryFactory from '../../../src/infra/factory/PrismaRepositoryFactory';
import PrismaDAOFactory from '../../../src/infra/factory/PrismaDAOFactory';
import PrismaTestContext from '../../__helpers';

let db: PrismaClient;
const prismaCtx = new PrismaTestContext();

beforeEach(async () => {
  db = await prismaCtx.before();
});

test('Should find user by unique constraint', async () => {
  const userCreated = new CreateUser(new PrismaRepositoryFactory(db));
  const input: CreateUserInput = {
    name: 'John Doe',
    email: 'jhon.doe@mail.co',
    phone: '+5511999999998',
    born: '2020-01-01',
    cpf: '53392035653',
    gender: 'M',
    password: '123455',
    roleName: 'LESSOR',
    address: {
      street: 'Rua dos bobos',
      number: '123',
      country: 'Brasil',
      zipCode: '46900000',
      neighborhood: 'Bairro',
      complement: 'Complemento',
    },
  };
  await userCreated.execute(input);

  const user = new FindUser(new PrismaDAOFactory(db));
  const output = await user.execute({ email: 'jhon.doe@mail.co' });
  expect(!!output.id).toBeTruthy();
});

afterEach(async () => {
  await prismaCtx.after();
});
