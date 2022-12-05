import { DomainEvent } from '#shared/infra/broker';
import { Schedule } from '../entities';

export class ScheduleCreated implements DomainEvent {
  name = 'ScheduleCreated';

  constructor(readonly property: Schedule) {}
}
