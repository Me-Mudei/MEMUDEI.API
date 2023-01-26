import { ScheduleFacade, CalendarFacade } from '../../../app/facade';
import { Broker } from '#shared/infra';
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
import { WinstonLogger } from '#shared/infra';
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
    );
    const searchScheduleUseCase = new SearchScheduleUseCase(
      repositoryFactory,
      broker,
    );
    const createScheduleUseCase = new CreateScheduleUseCase(
      repositoryFactory,
      broker,
    );
    const updateScheduleUseCase = new UpdateScheduleUseCase(
      repositoryFactory,
      broker,
    );

    return new ScheduleFacade({
      getSchedule: getScheduleUseCase,
      searchSchedule: searchScheduleUseCase,
      createSchedule: createScheduleUseCase,
      updateSchedule: updateScheduleUseCase,
    });
  }
  createCalendarFacade() {
    new WinstonLogger({
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
    );
    const searchCalendarUseCase = new SearchCalendarUseCase(
      repositoryFactory,
      broker,
    );
    const createCalendarUseCase = new CreateCalendarUseCase(
      repositoryFactory,
      broker,
    );
    const updateCalendarUseCase = new UpdateCalendarUseCase(
      repositoryFactory,
      broker,
    );
    const deleteCalendarUseCase = new DeleteCalendarUseCase(
      repositoryFactory,
      broker,
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
