import { Schedule } from '../../domain/entities';
import { ScheduleCreated } from '../../domain/events';
import { RepositoryFactory } from '../../domain/factory';
import {
  ScheduleRepository,
  CalendarRepository,
  PropertyRepository,
  UserRepository,
} from '../../domain/repository';

import {
  CreateScheduleInput,
  ScheduleOutput,
  ScheduleOutputMapper,
} from '../dto';
import { UseCase } from '#shared/app';
import { Broker, LoggerInterface, SingletonLogger } from '#shared/infra';
import { OverlapScheduleError } from '../../domain/errors/overlap-schedule.error';

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
    readonly broker: Broker,
  ) {
    this.logger = SingletonLogger.getInstance();
    this.scheduleRepository = repositoryFactory.createScheduleRepository();
    this.propertyRepository = repositoryFactory.createPropertyRepository();
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async execute(input: CreateScheduleInput): Promise<ScheduleOutput> {
    this.logger.info({ message: 'Start CreateSchedule Use Case' });
    const scheduler = await this.userRepository.findById(input.scheduler_id);
    const property = await this.propertyRepository.findById(input.property_id);
    const schedule = new Schedule({
      start: input.start,
      obs: input.obs,
      property,
      scheduler,
    });
    if (!schedule.available()) {
      throw new OverlapScheduleError('Calendar is not available');
    }
    this.broker.publish(new ScheduleCreated(schedule));
    await this.scheduleRepository.insert(schedule);
    return ScheduleOutputMapper.toOutput(schedule);
  }
}
