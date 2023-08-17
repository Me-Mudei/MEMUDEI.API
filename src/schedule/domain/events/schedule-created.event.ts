import { DomainEvent } from "#shared/infra";

import { Schedule } from "../entities";

export class ScheduleCreated implements DomainEvent {
  name = "ScheduleCreated";

  constructor(readonly payload: Schedule) {}
}
