//import { UniqueEntityId } from '#shared/domain';
import { OverlapScheduleError } from '../../errors/overlap-schedule.error';
import { Calendar, Schedule, Weekday, Hour, Property, User } from '../';

describe('Schedule Unit Tests', () => {
  let user: User;
  let property: Property;

  beforeEach(() => {
    user = new User({});
    property = new Property({});
  });

  it('should be able to schedule a visit to a property', () => {
    const weekday = new Weekday({
      day: 4,
      hours: [
        new Hour({ value: 420 }),
        new Hour({ value: 480 }),
        new Hour({ value: 540 }),
      ],
    });
    let calendar = new Calendar({
      is_active: true,
      available_weekdays: [weekday],
    });
    let schedule = new Schedule({
      property,
      scheduler: user,
      start: new Date('2022-11-03T07:00:00.000Z'),
      calendar,
    });
    expect(calendar.available(schedule)).toBeTruthy();
    expect(calendar.events.length).toBe(0);

    calendar = new Calendar({
      is_active: true,
      available_weekdays: [weekday],
      events: [
        new Schedule({
          property,
          scheduler: user,
          start: new Date('2022-11-03T08:00:00.000Z'),
        }),
      ],
    });

    schedule = new Schedule({
      property,
      scheduler: user,
      start: new Date('2022-11-03T07:00:00.000Z'),
      calendar,
    });
    expect(calendar.available(schedule)).toBeTruthy();
    expect(calendar.events.length).toBe(1);
  });

  it('should not be able to schedule a visit to a property', () => {
    const weekday = new Weekday({
      day: 4,
      hours: [
        new Hour({ value: 420 }),
        new Hour({ value: 450 }),
        new Hour({ value: 480 }),
        new Hour({ value: 520 }),
        new Hour({ value: 540 }),
        new Hour({ value: 570 }),
      ],
    });
    const calendar = new Calendar({
      is_active: true,
      available_weekdays: [weekday],
      schedule_duration: 60,
      events: [
        new Schedule({
          property,
          scheduler: user,
          start: new Date('2022-11-03T07:00:00.000Z'),
        }),
      ],
    });
    expect(
      () =>
        new Schedule({
          property,
          scheduler: user,
          start: new Date('2022-11-03T07:30:00.000Z'),
          calendar,
        }),
    ).toThrow(new OverlapScheduleError('Calendar is not available'));
  });
});
