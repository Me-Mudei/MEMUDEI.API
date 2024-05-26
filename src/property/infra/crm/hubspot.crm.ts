import { AssociationTypes, Client } from "@hubspot/api-client";
import {
  Filter,
  FilterOperatorEnum,
} from "@hubspot/api-client/lib/codegen/crm/companies";
import { AssociationSpecAssociationCategoryEnum } from "@hubspot/api-client/lib/codegen/crm/deals";
import { Property } from "#property/domain";
import { configEnv } from "#shared/infra";

import { CRM } from "./crm.interface";

export enum Stage {
  NEW_LEAD = "appointmentscheduled",
  PROSPECTION = "97320630",
  PROPOSAL_SENT = "qualifiedtobuy",
  WAITING_FOR_FORM_TO_SEND_PHOTOS = "presentationscheduled",
  IN_ATTENDANCE_MEMUDEI = "decisionmakerboughtin",
  PHOTOS_APPROVED_BUT_FORM_MISSING = "contractsent",
  PHOTOS_AND_FORMS_APPROVED = "closedwon",
  PUBLISHED = "closedlost",
  DOUBLE_CHECK_AD = "6074140",
  ASSIGNED_TO_FARMER = "6074141",
}

export class HubspotCRM implements CRM {
  private client: Client;

  constructor() {
    this.client = new Client({
      accessToken: configEnv.crm.accessToken,
    });
  }

  private async searchUser(filters: Array<Filter>) {
    return this.client.crm.contacts.searchApi.doSearch({
      filterGroups: [{ filters }],
      after: "0",
      limit: 5,
      sorts: ["-createdate"],
      properties: ["id"],
    });
  }

  async createProperty(property: Property) {
    const users = await this.searchUser([
      {
        propertyName: "user_id",
        operator: FilterOperatorEnum.Eq,
        value: property.user_id.value,
      },
    ]);
    if (users.total === 0) {
      throw new Error("User not found on Hubspot");
    }
    const owner = users.results[0];
    await this.client.crm.deals.basicApi.create({
      properties: {
        property_id: property.id,
        dealname: property.title,
        description: property.description,
        dealstage: Stage.PUBLISHED,
        amount: property.charges
          .reduce((acc, charge) => acc + charge.amount, 0)
          .toString(),
        endereco_completo: property.address.formatted(),
        cidade: property.address.city,
        hs_priority: "low",
      },
      associations: [
        {
          types: [
            {
              associationCategory:
                AssociationSpecAssociationCategoryEnum.HubspotDefined,
              associationTypeId: AssociationTypes.dealToContact,
            },
          ],
          to: {
            id: owner.id,
          },
        },
      ],
    });
  }

  async deleteProperty(id: string) {
    await this.client.crm.tickets.basicApi.archive(id);
  }
}
