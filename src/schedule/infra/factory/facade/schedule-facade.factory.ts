import { ScheduledVisitSendToCRMHandler } from "#schedule/app";
import { Broker } from "#shared/infra";

import { ScheduleFacade } from "../../../app/facade";
import { ScheduleVisitUseCase } from "../../../app/use-cases";
import { PrismaRepositoryFactory } from "../repository";

export class ScheduleFacadeFactory {
  static create() {
    const repositoryFactory = new PrismaRepositoryFactory();
    const broker = new Broker();
    broker.register(new ScheduledVisitSendToCRMHandler());
    const scheduleVisitUseCase = new ScheduleVisitUseCase(
      repositoryFactory,
      broker,
    );

    return new ScheduleFacade({
      scheduleVisit: scheduleVisitUseCase,
    });
  }
}
