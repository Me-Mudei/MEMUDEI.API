import { Schedule, ScheduleCreated, User } from "#schedule/domain";
import { UseCase } from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import { Broker, LoggerInterface, WinstonLogger } from "#shared/infra";

import { RepositoryFactory } from "../../domain/factory";
import { ScheduleRepository } from "../../domain/repository";
import {
  ScheduleVisitInput,
  ScheduleVisitOutput,
  ScheduleVisitOutputMapper,
} from "../dto";

export class ScheduleVisitUseCase
  implements UseCase<ScheduleVisitInput, ScheduleVisitOutput>
{
  scheduleRepository: ScheduleRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = WinstonLogger.getInstance();
    this.scheduleRepository = repositoryFactory.createScheduleRepository();
  }

  async execute(input: ScheduleVisitInput): Promise<ScheduleVisitOutput> {
    this.logger.info({ message: "Start Schedule  Visit Use Case" });
    const visitor = new User({
      name: input.visitor.name,
      email: input.visitor.email,
      phone: input.visitor.phone,
    });
    const schedule = new Schedule({
      property_id: new UniqueEntityId(input.property_id),
      date_time: new Date(input.date_time),
      status: input.status,
      note: input.note,
      visitor,
    });
    await this.scheduleRepository.insert(schedule);
    await this.broker.publish(new ScheduleCreated(schedule));
    return ScheduleVisitOutputMapper.toOutput(schedule);
  }
}
