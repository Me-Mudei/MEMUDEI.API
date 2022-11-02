import { Broker, LoggerInterface, WinstonLogger } from '../../../shared/infra';
import {
  CreateScheduleUseCase,
  DeleteScheduleUseCase,
  GetScheduleUseCase,
  SearchScheduleUseCase,
  UpdateScheduleUseCase,
} from '../use-cases';
import { ScheduleFacade } from './schedule.facade';
import { InMemoryRepositoryFactory } from '../../infra';
import { RepositoryFactory } from '../../domain';

describe('ScheduleFacade Unit tests', () => {
  let createSchedule: CreateScheduleUseCase;
  let getSchedule: GetScheduleUseCase;
  let updateSchedule: UpdateScheduleUseCase;
  let searchSchedule: SearchScheduleUseCase;
  let deleteSchedule: DeleteScheduleUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;
  let facade: ScheduleFacade;
  let logger: LoggerInterface;

  beforeEach(() => {
    repositoryFactory = new InMemoryRepositoryFactory();
    broker = new Broker();
    logger = new WinstonLogger({
      svc: 'CreateUserUseCase',
      req: {
        req_id: 'test',
        req_path: 'test',
        req_method: 'test',
        req_ua: 'test',
      },
    });
    createSchedule = new CreateScheduleUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    getSchedule = new GetScheduleUseCase(repositoryFactory, broker, logger);
    updateSchedule = new UpdateScheduleUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    searchSchedule = new SearchScheduleUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    deleteSchedule = new DeleteScheduleUseCase(
      repositoryFactory,
      broker,
      logger,
    );
    facade = new ScheduleFacade({
      createSchedule,
      getSchedule,
      deleteSchedule,
      searchSchedule,
      updateSchedule,
    });
  });
  it('should create a schedule facade', async () => {
    const spyFacadeCreate = jest.spyOn(facade, 'createSchedule');
    const spyUseCaseExecute = jest.spyOn(createSchedule, 'execute');
    const createScheduleProps = {
      date: new Date(),
    };
    await facade.createSchedule(createScheduleProps);
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
