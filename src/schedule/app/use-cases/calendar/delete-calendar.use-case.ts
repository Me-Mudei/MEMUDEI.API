import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { CalendarRepository } from "../../../domain/repository";

export class DeleteCalendarUseCase implements UseCase<{ id: string }, void> {
  calendarRepository: CalendarRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.calendarRepository = repositoryFactory.createCalendarRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: "Start DeleteCalendar Use Case" });
    await this.calendarRepository.delete(input.id);
  }
}
