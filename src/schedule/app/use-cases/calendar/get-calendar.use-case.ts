import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import { CalendarRepository } from "../../../domain/repository";
import { CalendarOutput, CalendarOutputMapper } from "../../dto";

export class GetCalendarUseCase
  implements UseCase<{ id: string }, CalendarOutput>
{
  calendarRepository: CalendarRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.calendarRepository = repositoryFactory.createCalendarRepository();
  }

  async execute(input: { id: string }): Promise<CalendarOutput> {
    this.logger.info({ message: "Start GetCalendar Use Case" });
    const calendar = await this.calendarRepository.findById(input.id);
    return CalendarOutputMapper.toOutput(calendar);
  }
}
