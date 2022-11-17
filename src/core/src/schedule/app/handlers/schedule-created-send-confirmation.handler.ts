import { ScheduleCreated } from '../../domain/events';

export class ScheduleCreatedSendConfirmationHandler {
  name = 'ScheduleCreated';

  async handle(event: ScheduleCreated): Promise<void> {
    /**
     * Send confirmation email to scheduler
     * Email should contain:
     * - Schedule start date
     * - Schedule duration
     * - Schedule status
     * - Property address
     * - Property owner name
     * - Property owner contact info
     * - Link to cancel schedule
     */
    console.log('EVENT HANDLE', event);
  }
}
