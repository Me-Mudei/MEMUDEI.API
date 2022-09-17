import { DomainEvent } from "../../../@shared/infra/broker";
import User from "../entity/user.entity";

export default class UserCreated implements DomainEvent {
  name = "UserCreated";

  constructor(readonly user: User) {}
}
