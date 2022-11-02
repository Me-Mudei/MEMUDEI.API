import { Schedule, ScheduleRepository, RepositoryFactory } from '../../domain';
import { Broker } from '../../../shared/infra/';
import {
  CreateScheduleInput,
  ScheduleOutput,
  ScheduleOutputMapper,
} from '../dto';
import { UseCase } from '../../../shared/app';
import { LoggerInterface } from '../../../shared/infra/logger/logger.interface';

export class CreateScheduleUseCase
  implements UseCase<CreateScheduleInput, ScheduleOutput>
{
  scheduleRepository: ScheduleRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.scheduleRepository = repositoryFactory.createScheduleRepository();
  }

  async execute(_input: CreateScheduleInput): Promise<ScheduleOutput> {
    this.logger.info({ message: 'Start CreateSchedule Use Case' });
    const schedule = new Schedule({});
    await this.scheduleRepository.insert(schedule);
    return ScheduleOutputMapper.toOutput(schedule);
  }
}
