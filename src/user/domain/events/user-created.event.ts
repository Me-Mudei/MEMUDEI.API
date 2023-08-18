import { DomainEvent } from "#shared/infra";

import { User } from "../entities";

export class UserCreated implements DomainEvent {
  name = "UserCreated";

  constructor(readonly payload: User) {}
}
