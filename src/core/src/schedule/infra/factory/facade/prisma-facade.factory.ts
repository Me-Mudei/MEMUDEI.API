import { ScheduleFacade } from '../../../app/facade';
import { Broker } from '../../../../shared/infra/broker';
import {
  GetScheduleUseCase,
  SearchScheduleUseCase,
  CreateScheduleUseCase,
  UpdateScheduleUseCase,
  DeleteScheduleUseCase,
} from '../../../app/use-cases';
import { PrismaRepositoryFactory } from '../repository';
import { WinstonLogger } from '../../../../shared/infra/logger/winston.logger';

export class PrismaFacadeFactory {
  constructor(readonly req: any) {}
  create() {
    const logger = new WinstonLogger({
      svc: 'testSvc',
      req: {
        req_id: this.req.req_id,
        req_path: this.req.req_path,
        req_method: this.req.req_method,
        req_ua: this.req.req_ua,
      },
    });
    const repositoryFactory = new PrismaRepositoryFactory();
    const broker = new Broker();

    const getScheduleUseCase = new GetScheduleUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const searchScheduleUseCase = new SearchScheduleUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const createScheduleUseCase = new CreateScheduleUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const updateScheduleUseCase = new UpdateScheduleUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const deleteScheduleUseCase = new DeleteScheduleUseCase(
      repositoryFactory,
      broker,
      logger,
    );

    return new ScheduleFacade({
      getSchedule: getScheduleUseCase,
      searchSchedule: searchScheduleUseCase,
      createSchedule: createScheduleUseCase,
      updateSchedule: updateScheduleUseCase,
      deleteSchedule: deleteScheduleUseCase,
    });
  }
}
