import DomainEvent from '../../infra/broker/DomainEvent';
import User from '../entity/User';

export default class UserCreated implements DomainEvent {
  name = 'UserCreated';

  constructor(readonly user: User) {}
}
