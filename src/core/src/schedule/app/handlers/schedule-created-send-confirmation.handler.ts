import { ScheduleCreated } from '../../domain/events';

export class ScheduleCreatedSendConfirmationHandler {
  name = 'ScheduleCreated';

  async handle(event: ScheduleCreated): Promise<void> {
    console.log('EVENT HANDLE', event);
  }
}
