import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { ScheduleRepository, RepositoryFactory } from "../../domain";
import { ScheduleOutput, ScheduleOutputMapper } from "../dto";

export class GetScheduleUseCase
  implements UseCase<{ id: string }, ScheduleOutput>
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

  async execute(input: { id: string }): Promise<ScheduleOutput> {
    this.logger.info({ message: "Start GetSchedule Use Case" });
    const schedule = await this.scheduleRepository.findById(input.id);
    return ScheduleOutputMapper.toOutput(schedule);
  }
}
