import { DomainEvent } from "../../../@shared/infra/broker/broker";
import User from "../entities/user.entity";

export default class UserCreated implements DomainEvent {
  name = "UserCreated";

  constructor(readonly user: User) {}
}
