import { Broker } from "#shared/infra";

import { ScheduleFacade } from "../../../app/facade";
import { ScheduleVisitUseCase } from "../../../app/use-cases";
import { PrismaRepositoryFactory } from "../repository";

export class ScheduleFacadeFactory {
  constructor(readonly req: any) {}
  createScheduleFacade() {
    const repositoryFactory = new PrismaRepositoryFactory();
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
