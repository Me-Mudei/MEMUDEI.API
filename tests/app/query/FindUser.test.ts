import { PrismaClient } from '@prisma/client';
import CreateUser from '../../../src/app/usecase/create_user/CreateUser';
import { CreateUserInput } from '../../../src/app/usecase/create_user/ICreateUser';
import FindUser from '../../../src/app/query/find_user/FindUser';
import PrismaRepositoryFactory from '../../../src/infra/factory/PrismaRepositoryFactory';
import PrismaDAOFactory from '../../../src/infra/factory/PrismaDAOFactory';
import PrismaTestContext from '../../__helpers';
//import NodeMailerMailClientAdapter from '../../../src/infra/mail_client/NodeMailerMailClientAdapter';
import Broker from '../../../src/infra/broker/Broker';
//import UserCreatedSendConfirmationHandler from '../../../src/app/handler/UserCreatedSendConfirmationHandler';

let db: PrismaClient;
const prismaCtx = new PrismaTestContext();
let userCreated: CreateUser;

beforeEach(async () => {
  db = await prismaCtx.before();
  const repositoryFactory = new PrismaRepositoryFactory(db);
  //const mailClient = new NodeMailerMailClientAdapter();
  const broker = new Broker();
  //broker.register(new UserCreatedSendConfirmationHandler(mailClient));
  userCreated = new CreateUser(repositoryFactory, broker);
});

test('Should find user by unique constraint', async () => {
  const input: CreateUserInput = {
    email: 'jhon.doe@mail.co',
    name: 'John Doe',
    roleName: 'LESSOR',
  };
  await userCreated.execute(input);

  const user = new FindUser(new PrismaDAOFactory(db));
  const output = await user.execute({ email: 'jhon.doe@mail.co' });
  expect(!!output.id).toBeTruthy();
});
