import { DomainEvent } from '../../../shared/infra/broker';
import { Property } from '../entities';

export class PropertyCreated implements DomainEvent {
  name = 'PropertyCreated';

  constructor(readonly property: Property) {}
}
