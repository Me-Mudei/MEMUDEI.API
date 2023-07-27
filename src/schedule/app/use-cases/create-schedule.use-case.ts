import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { Schedule } from "../../domain/entities";
import { OverlapScheduleError } from "../../domain/errors/overlap-schedule.error";
import { ScheduleCreated } from "../../domain/events";
import { RepositoryFactory } from "../../domain/factory";
import {
  ScheduleRepository,
  CalendarRepository,
  PropertyRepository,
  UserRepository
} from "../../domain/repository";
import {
  CreateScheduleInput,
  ScheduleOutput,
  ScheduleOutputMapper
} from "../dto";

export class CreateScheduleUseCase
  implements UseCase<CreateScheduleInput, ScheduleOutput>
{
  scheduleRepository: ScheduleRepository;
  calendarRepository: CalendarRepository;
  propertyRepository: PropertyRepository;
  userRepository: UserRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.scheduleRepository = repositoryFactory.createScheduleRepository();
  }

  async execute(input: CreateScheduleInput): Promise<ScheduleOutput> {
    this.logger.info({ message: "Start CreateSchedule Use Case" });
    const scheduler = await this.userRepository.findById(input.scheduler_id);
    const property = await this.propertyRepository.findById(input.property_id);
    const schedule = new Schedule({
      start: input.start,
      obs: input.obs,
      property,
      scheduler
    });
    if (!schedule.available()) {
      throw new OverlapScheduleError("Calendar is not available");
    }
    this.broker.publish(new ScheduleCreated(schedule));
    await this.scheduleRepository.insert(schedule);
    return ScheduleOutputMapper.toOutput(schedule);
  }
}
