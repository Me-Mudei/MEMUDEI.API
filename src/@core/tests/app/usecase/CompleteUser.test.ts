import { PrismaClient } from "@prisma/client";
import CompleteUser from "../../../src/app/usecase/complete_user/CompleteUser";
import { CompleteUserInput } from "../../../src/app/usecase/complete_user/ICompleteUser";
import CreateUser from "../../../src/app/usecase/create_user/CreateUser";
import { CreateUserInput } from "../../../src/app/usecase/create_user/ICreateUser";
//import UserCompletedSendConfirmationHandler from '../../../src/app/handler/UserCompletedSendConfirmationHandler';
import Broker from "../../../src/infra/broker";
import PrismaRepositoryFactory from "../../../src/infra/factory/PrismaRepositoryFactory";
//import NodeMailerMailClientAdapter from '../../../src/infra/mail_client/NodeMailerMailClientAdapter';
import PrismaTestContext from "../../__helpers";

let db: PrismaClient;
const prismaCtx = new PrismaTestContext();
let user: CompleteUser;
let userCreated: CreateUser;

beforeEach(async () => {
  db = await prismaCtx.before();
  const repositoryFactory = new PrismaRepositoryFactory(db);
  //const mailClient = new NodeMailerMailClientAdapter();
  const broker = new Broker();
  //broker.register(new UserCompletedSendConfirmationHandler(mailClient));
  user = new CompleteUser(repositoryFactory, broker);
  userCreated = new CreateUser(repositoryFactory, broker);
});

test("Should be able to complete a user", async () => {
  const inputCreate: CreateUserInput = {
    email: "jhon.update@mail.com",
    name: "John Doe",
    roleName: "VISITANT",
  };
  await userCreated.execute(inputCreate);

  const input: CompleteUserInput = {
    email: "jhon.update@mail.com",
    name: "John Doe",
    roleName: "LESSEE",
    phone: "+5511999999999",
    born: "2020-01-01",
    cpf: "04513038578",
    address: {
      street: "Rua dos bobos",
      number: "123",
      country: "Brasil",
      zipCode: "46900000",
      neighborhood: "Bairro",
      complement: "Complemento",
    },
  };
  const result = await user.execute(input);
  expect(result.status).toBe("USER_COMPLETED");
});
