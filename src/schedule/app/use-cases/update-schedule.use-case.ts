import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { Schedule, ScheduleRepository, RepositoryFactory } from "../../domain";
import {
  ScheduleOutput,
  ScheduleOutputMapper,
  UpdateScheduleInput
} from "../dto";

export class UpdateScheduleUseCase
  implements UseCase<UpdateScheduleInput, ScheduleOutput>
{
  scheduleRepository: ScheduleRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker
  ) {
    this.logger = WinstonLogger.getInstance();
    this.scheduleRepository = repositoryFactory.createScheduleRepository();
  }

  async execute(_input: UpdateScheduleInput): Promise<ScheduleOutput> {
    this.logger.info({ message: "Start UpdateSchedule Use Case" });
    const schedule = new Schedule({} as any);
    await this.scheduleRepository.update(schedule);
    return ScheduleOutputMapper.toOutput(schedule);
  }
}
