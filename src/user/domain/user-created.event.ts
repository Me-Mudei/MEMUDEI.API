import { DomainEvent } from "#shared/infra";

import { User } from "./user.entity";

export class UserCreated implements DomainEvent {
  name = "UserCreated";

  constructor(readonly payload: User) {}
}
