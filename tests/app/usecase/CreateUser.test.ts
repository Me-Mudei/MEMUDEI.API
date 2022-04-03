import { PrismaClient } from '@prisma/client';
import CreateUser from '../../../src/app/usecase/create_user/CreateUser';
import { CreateUserInput } from '../../../src/app/usecase/create_user/ICreateUser';
//import UserCreatedSendConfirmationHandler from '../../../src/app/handler/UserCreatedSendConfirmationHandler';
import Broker from '../../../src/infra/broker/Broker';
import PrismaRepositoryFactory from '../../../src/infra/factory/PrismaRepositoryFactory';
//import NodeMailerMailClientAdapter from '../../../src/infra/mail_client/NodeMailerMailClientAdapter';
import PrismaTestContext from '../../__helpers';

let db: PrismaClient;
const prismaCtx = new PrismaTestContext();
let user: CreateUser;

beforeEach(async () => {
  db = await prismaCtx.before();
  const repositoryFactory = new PrismaRepositoryFactory(db);
  //const mailClient = new NodeMailerMailClientAdapter();
  const broker = new Broker();
  //broker.register(new UserCreatedSendConfirmationHandler(mailClient));
  user = new CreateUser(repositoryFactory, broker);
});

test('Should be able to create a user', async () => {
  const input: CreateUserInput = {
    email: 'jhon.doe@mail.com',
    name: 'John Doe',
    roleName: 'VISITOR',
  };
  const result = await user.execute(input);
  expect(result.status).toBe('USER_CREATED');
});
