import { AssociationTypes, Client } from "@hubspot/api-client";
import { FilterOperatorEnum } from "@hubspot/api-client/lib/codegen/crm/deals";
import { AssociationSpecAssociationCategoryEnum } from "@hubspot/api-client/lib/codegen/crm/tickets";
import { Schedule, User } from "#schedule/domain";
import { configEnv } from "#shared/infra";

import { CRM } from "./crm.interface";

export class HubspotCRM implements CRM {
  private client: Client;

  constructor() {
    this.client = new Client({
      accessToken: configEnv.crm.accessToken,
    });
  }

  private async createVisitor(visitor: User) {
    const visitorCreated = await this.client.crm.contacts.basicApi.create({
      properties: {
        firstname: visitor.name,
        email: visitor.email,
        phone: visitor.phone,
      },
      associations: [],
    });
    return { id: visitorCreated.id };
  }

  async createSchedule(schedule: Schedule) {
    let visitor: any;
    const properties = await this.client.crm.deals.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            {
              propertyName: "property_id",
              operator: FilterOperatorEnum.Eq,
              value: schedule.property_id,
            },
          ],
        },
      ],
      after: "0",
      limit: 5,
      sorts: ["-createdate"],
      properties: ["id"],
    });
    if (properties.total === 0) {
      throw new Error("Property not found on Hubspot");
    }
    const users = await this.client.crm.contacts.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            {
              propertyName: "email",
              operator: FilterOperatorEnum.Eq,
              value: schedule.visitor.email,
            },
          ],
        },
      ],
      after: "0",
      limit: 5,
      sorts: ["-createdate"],
      properties: ["id"],
    });
    if (users.total > 0) {
      visitor = users.results[0];
    } else {
      visitor = await this.createVisitor(schedule.visitor);
    }
    const scheduleCreated = await this.client.crm.tickets.basicApi.create({
      properties: {
        subject: "Agendamento de visita",
        content: schedule.date_time.toISOString(),
        hs_ticket_priority: "MEDIUM",
        hs_pipeline_stage: "1",
      },
      associations: [
        {
          types: [
            {
              associationCategory:
                AssociationSpecAssociationCategoryEnum.HubspotDefined,
              associationTypeId: AssociationTypes.ticketToContact,
            },
          ],
          to: {
            id: visitor.id,
          },
        },
        {
          types: [
            {
              associationCategory:
                AssociationSpecAssociationCategoryEnum.HubspotDefined,
              associationTypeId: AssociationTypes.ticketToDeal,
            },
          ],
          to: {
            id: properties.results[0].id,
          },
        },
      ],
    });
  }

  async deleteSchedule(id: string) {
    await this.client.crm.tickets.basicApi.archive(id);
  }
}
