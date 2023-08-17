import { Client } from "@hubspot/api-client";
import { Schedule, User } from "#schedule/domain";
import { configEnv } from "#shared/infra";

import { CRM } from "./crm.interface";

export class HubspotCRM implements CRM {
  private client: Client;

  constructor() {
    this.client = new Client({
      accessToken: configEnv.crm.accessToken
    });
  }

  private async createVisitor(visitor: User) {
    const visitorCreated = await this.client.crm.contacts.basicApi.create({
      properties: {
        firstname: visitor.name,
        email: visitor.email,
        phone: visitor.phone
      },
      associations: []
    });
    return { id: visitorCreated.id };
  }

  async createSchedule(schedule: Schedule) {
    const visitor = await this.createVisitor(schedule.visitor);
    const scheduleCreated = await this.client.crm.tickets.basicApi.create({
      properties: {
        data: schedule.date_time.toISOString(),
        nota: schedule.note
      },
      associations: [
        {
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 1
            }
          ],
          to: {
            id: visitor.id
          }
        }
      ]
    });
    return { id: scheduleCreated.id };
  }
}
