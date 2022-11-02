import { ScheduleRepository, RepositoryFactory } from '../../domain';
import { Broker } from '../../../shared/infra/';
import { UseCase } from '../../../shared/app';
import { LoggerInterface } from '../../../shared/infra/logger/logger.interface';

export class DeleteScheduleUseCase implements UseCase<{ id: string }, void> {
  scheduleRepository: ScheduleRepository;
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly broker: Broker,
    readonly logger: LoggerInterface,
  ) {
    this.scheduleRepository = repositoryFactory.createScheduleRepository();
  }

  async execute(input: { id: string }): Promise<void> {
    this.logger.info({ message: 'Start DeleteSchedule Use Case' });
    await this.scheduleRepository.delete(input.id);
  }
}
