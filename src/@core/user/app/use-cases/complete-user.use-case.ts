import Address from "../../domain/entity/address.entity";
import User from "../../domain/entity/user.entity";
//import UserCompleted from '../../domain/event/UserCompleted';
import UserRepository from "../../domain/repository/user.repository";
import Broker from "../../../@shared/infra/broker";
import { CompleteUserInput, CompleteUserOutput } from "../dto/ICompleteUser";

export default class CompleteUser {
  constructor(
    readonly userRepository: UserRepository,
    readonly broker: Broker
  ) {}

  async execute(input: CompleteUserInput): Promise<CompleteUserOutput> {
    const address = new Address({
      street: input.address.street,
      number: input.address.number,
      country: input.address.country,
      zipCode: input.address.zipCode,
      neighborhood: input.address.neighborhood,
      complement: input.address.complement,
    });
    const user = new User(
      input.email,
      input.name,
      input.roleName,
      input.phone,
      new Date(input.born),
      address,
      input.cpf,
      input.description
    );
    await this.userRepository.complete(user);
    const output: CompleteUserOutput = {
      status: "USER_COMPLETED",
      message: "User completed successfully",
    };
    //await this.broker.publish(new UserCompleted(user));
    return output;
  }
}
