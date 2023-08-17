import { Broker } from "#shared/infra";

import { ScheduleFacade } from "../../../app/facade";
import { ScheduleVisitUseCase } from "../../../app/use-cases";
import { InMemoryRepositoryFactory } from "../repository";

export class ScheduleInMemoryFacadeFactory {
  static create() {
    const repositoryFactory = new InMemoryRepositoryFactory();
    const broker = new Broker();

    const scheduleVisitUseCase = new ScheduleVisitUseCase(
      repositoryFactory,
      broker
    );

    return new ScheduleFacade({
      scheduleVisit: scheduleVisitUseCase
    });
  }
}
