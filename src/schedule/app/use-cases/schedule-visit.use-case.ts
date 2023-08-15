import { UseCase } from "#shared/app";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../domain/factory";
import { ScheduleRepository } from "../../domain/repository";
import {
  ScheduleVisitInput,
  ScheduleVisitOutput,
  ScheduleVisitOutputMapper
} from "../dto";

export class ScheduleVisitUseCase
  implements UseCase<ScheduleVisitInput, ScheduleVisitOutput>
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

  async execute(input: ScheduleVisitInput): Promise<ScheduleVisitOutput> {
    this.logger.info({ message: "Start Schedule  Visit Use Case" });
    const schedule = input as any;
    return ScheduleVisitOutputMapper.toOutput(schedule);
  }
}
