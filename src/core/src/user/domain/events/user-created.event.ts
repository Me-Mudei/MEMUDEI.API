import { DomainEvent } from '#shared/infra/broker';
import { User } from '../entities';

export class UserCreated implements DomainEvent {
  name = 'UserCreated';

  constructor(readonly user: User) {}
}
