import { Broker } from '#shared/infra';
import {
  CreateScheduleUseCase,
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
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;
  let facade: ScheduleFacade;

  beforeEach(() => {
    repositoryFactory = new InMemoryRepositoryFactory();
    broker = new Broker();
    createSchedule = new CreateScheduleUseCase(repositoryFactory, broker);
    getSchedule = new GetScheduleUseCase(repositoryFactory, broker);
    updateSchedule = new UpdateScheduleUseCase(repositoryFactory, broker);
    searchSchedule = new SearchScheduleUseCase(repositoryFactory, broker);
    facade = new ScheduleFacade({
      createSchedule,
      getSchedule,
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
    await facade.createSchedule(createScheduleProps as any);
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
