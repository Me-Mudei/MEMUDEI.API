import { ScheduleFacade, CalendarFacade } from '../../../app/facade';
import { Broker } from '../../../../shared/infra/broker';
import {
  GetScheduleUseCase,
  SearchScheduleUseCase,
  CreateScheduleUseCase,
  UpdateScheduleUseCase,
  GetCalendarUseCase,
  SearchCalendarUseCase,
  CreateCalendarUseCase,
  UpdateCalendarUseCase,
  DeleteCalendarUseCase,
} from '../../../app/use-cases';
import { PrismaRepositoryFactory } from '../repository';
import { WinstonLogger } from '../../../../shared/infra/logger/winston.logger';
import { FacadeFactory } from '../../../domain/factory/facade.factory';

export class PrismaFacadeFactory implements FacadeFactory {
  constructor(readonly req: any) {}
  createScheduleFacade() {
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

    return new ScheduleFacade({
      getSchedule: getScheduleUseCase,
      searchSchedule: searchScheduleUseCase,
      createSchedule: createScheduleUseCase,
      updateSchedule: updateScheduleUseCase,
    });
  }
  createCalendarFacade() {
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

    const getCalendarUseCase = new GetCalendarUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const searchCalendarUseCase = new SearchCalendarUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const createCalendarUseCase = new CreateCalendarUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const updateCalendarUseCase = new UpdateCalendarUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    const deleteCalendarUseCase = new DeleteCalendarUseCase(
      repositoryFactory,
      broker,
      logger,
    );

    return new CalendarFacade({
      getCalendar: getCalendarUseCase,
      searchCalendar: searchCalendarUseCase,
      createCalendar: createCalendarUseCase,
      updateCalendar: updateCalendarUseCase,
      deleteCalendar: deleteCalendarUseCase,
    });
  }
}
