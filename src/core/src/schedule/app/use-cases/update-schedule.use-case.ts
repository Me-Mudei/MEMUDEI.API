import { Schedule, ScheduleRepository, RepositoryFactory } from '../../domain';

import {
  ScheduleOutput,
  ScheduleOutputMapper,
  UpdateScheduleInput,
} from '../dto';
import { UseCase } from '#shared/app';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';

export class UpdateScheduleUseCase
  implements UseCase<UpdateScheduleInput, ScheduleOutput>
{
  scheduleRepository: ScheduleRepository;
  private logger: LoggerInterface;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.scheduleRepository = repositoryFactory.createScheduleRepository();
  }

  async execute(_input: UpdateScheduleInput): Promise<ScheduleOutput> {
    this.logger.info({ message: 'Start UpdateSchedule Use Case' });
    const schedule = new Schedule({});
    await this.scheduleRepository.update(schedule);
    return ScheduleOutputMapper.toOutput(schedule);
  }
}
