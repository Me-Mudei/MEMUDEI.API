import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { Calendar, CalendarRepository } from "../../../domain";
import { RepositoryFactory } from "../../../domain/factory";
import {
  CalendarOutput,
  CalendarOutputMapper,
  UpdateCalendarInput
} from "../../dto";

export class UpdateCalendarUseCase
  implements UseCase<UpdateCalendarInput, CalendarOutput>
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

  async execute(_input: UpdateCalendarInput): Promise<CalendarOutput> {
    this.logger.info({ message: "Start UpdateCalendar Use Case" });
    const calendar = new Calendar({});
    await this.calendarRepository.update(calendar);
    return CalendarOutputMapper.toOutput(calendar);
  }
}
