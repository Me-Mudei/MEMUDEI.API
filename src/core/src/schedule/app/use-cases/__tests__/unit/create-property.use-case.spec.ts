import { CreateScheduleUseCase } from '../../create-schedule.use-case';
import {
  InMemoryRepositoryFactory,
  PropertyInMemoryRepository,
  UserInMemoryRepository,
} from '../../../../infra';
import {
  LoggerInterface,
  WinstonLogger,
  Broker,
} from '../../../../../shared/infra';
import { UniqueEntityId } from '../../../../../shared/domain';
import {
  RepositoryFactory,
  Property,
  User,
  Calendar,
  Schedule,
  Weekday,
  Hour,
} from '../../../../domain';
import { OverlapScheduleError } from '../../../../domain/errors/overlap-schedule.error';

describe('CreateScheduleUseCase Unit Tests', () => {
  let useCase: CreateScheduleUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;
  let logger: LoggerInterface;
  const activeScheduleStart = new Date('2022-11-21T07:00:00.000Z');

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
    const userRepository = new UserInMemoryRepository();
    const hours = [
      new Hour({ value: 7 * 60 }),
      new Hour({ value: 7.5 * 60 }),
      new Hour({ value: 8 * 60 }),
      new Hour({ value: 8.5 * 60 }),
      new Hour({ value: 9 * 60 }),
      new Hour({ value: 9.5 * 60 }),
      new Hour({ value: 10 * 60 }),
      new Hour({ value: 10.5 * 60 }),
      new Hour({ value: 11 * 60 }),
      new Hour({ value: 11.5 * 60 }),
      new Hour({ value: 12 * 60 }),
      new Hour({ value: 12.5 * 60 }),
      new Hour({ value: 13 * 60 }),
      new Hour({ value: 13.5 * 60 }),
      new Hour({ value: 14 * 60 }),
      new Hour({ value: 14.5 * 60 }),
      new Hour({ value: 15 * 60 }),
      new Hour({ value: 15.5 * 60 }),
      new Hour({ value: 16 * 60 }),
      new Hour({ value: 16.5 * 60 }),
      new Hour({ value: 17 * 60 }),
      new Hour({ value: 17.5 * 60 }),
      new Hour({ value: 18 * 60 }),
      new Hour({ value: 18.5 * 60 }),
      new Hour({ value: 19 * 60 }),
      new Hour({ value: 19.5 * 60 }),
      new Hour({ value: 20 * 60 }),
    ];
    const owner = new User({
      id: new UniqueEntityId('KC3bcqEZoTt5BUByd9qwH'),
      calendars: [
        new Calendar({
          id: new UniqueEntityId('hvm3HnQZa9mumQ_dghywi'),
          is_active: true,
          weekdays: [
            new Weekday({ day: 1, hours }),
            new Weekday({ day: 2, hours }),
            new Weekday({ day: 3, hours }),
            new Weekday({ day: 4, hours }),
            new Weekday({ day: 5, hours }),
          ],
          events: [
            new Schedule({
              id: new UniqueEntityId('T1g9FuuVznxEBnzFKU3mh'),
              start: activeScheduleStart,
              status: 'approved',
            }),
          ],
        }),
      ],
    });
    const scheduler = new User({
      id: new UniqueEntityId('Ryz0ucxehQKZzbKuWcZ6E'),
    });
    userRepository.items = [owner, scheduler];
    const createUserRepository = () => userRepository;
    const propertyRepository = new PropertyInMemoryRepository();
    propertyRepository.items = [
      new Property({
        id: new UniqueEntityId('CEiQmjH2zKOZ37yuzQHfA'),
        owner,
      }),
    ];
    const createPropertyRepository = () => propertyRepository;

    repositoryFactory.createUserRepository = createUserRepository;
    repositoryFactory.createPropertyRepository = createPropertyRepository;

    useCase = new CreateScheduleUseCase(repositoryFactory, broker, logger);
  });

  it('should create a schedule', async () => {
    const spyRepositoryInsert = jest.spyOn(
      useCase.scheduleRepository,
      'insert',
    );

    const schedule = await useCase.execute({
      start: new Date('2022-11-21T08:00:00.000Z'),
      property_id: 'CEiQmjH2zKOZ37yuzQHfA',
      scheduler_id: 'Ryz0ucxehQKZzbKuWcZ6E',
    });
    expect(schedule).toMatchObject({ status: 'pending' });
    expect(spyRepositoryInsert).toHaveBeenCalledTimes(1);
  });

  it('should not create a schedule', async () => {
    const arrange = [
      {
        params: { start: activeScheduleStart },
        result: new OverlapScheduleError('Calendar is not available'),
      },
      {
        params: { start: new Date('2022-11-21T07:10:00.000Z') },
        result: new OverlapScheduleError('Calendar is not available'),
      },
      {
        params: { start: new Date('2022-11-21T06:50:00.000Z') },
        result: new OverlapScheduleError('Calendar is not available'),
      },
      {
        params: { start: new Date('2022-11-21T06:00:00.000Z') },
        result: new OverlapScheduleError('Calendar is not available'),
      },
    ];

    for (const { params, result } of arrange) {
      expect(() =>
        useCase.execute({
          ...params,
          property_id: 'CEiQmjH2zKOZ37yuzQHfA',
          scheduler_id: 'Ryz0ucxehQKZzbKuWcZ6E',
        }),
      ).rejects.toThrow(result);
    }
  });
});
