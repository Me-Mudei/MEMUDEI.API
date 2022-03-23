import { PrismaClient } from '@prisma/client';
import CreateUser from '../../../src/app/usecase/create_user/CreateUser';
import { CreateUserInput } from '../../../src/app/usecase/create_user/ICreateUser';
import UserCreatedSendConfirmationHandler from '../../../src/app/handler/UserCreatedSendConfirmationHandler';
import Broker from '../../../src/infra/broker/Broker';
import PrismaRepositoryFactory from '../../../src/infra/factory/PrismaRepositoryFactory';
import NodeMailerMailClientAdapter from '../../../src/infra/mail_client/NodeMailerMailClientAdapter';
import PrismaTestContext from '../../__helpers';

let db: PrismaClient;
const prismaCtx = new PrismaTestContext();
let user: CreateUser;

beforeEach(async () => {
  db = await prismaCtx.before();
  const repositoryFactory = new PrismaRepositoryFactory(db);
  const mailClient = new NodeMailerMailClientAdapter();
  const broker = new Broker();
  broker.register(new UserCreatedSendConfirmationHandler(mailClient));
  user = new CreateUser(repositoryFactory, broker);
});

test('Should be able to create a user', async () => {
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

afterEach(async () => {
  await prismaCtx.after();
});
