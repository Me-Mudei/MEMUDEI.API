import { AssociationTypes, Client } from "@hubspot/api-client";
import {
  Filter,
  FilterOperatorEnum,
} from "@hubspot/api-client/lib/codegen/crm/companies";
import { AssociationSpecAssociationCategoryEnum } from "@hubspot/api-client/lib/codegen/crm/deals";
import { DetailType, Property } from "#property/domain";
import { PrismaClient, configEnv } from "#shared/infra";

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

  constructor(readonly prisma: PrismaClient) {
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
    const foundProperty = await this.prisma.property.findFirst({
      where: { id: property.id },
      select: {
        created_by_id: true,
        details: {
          select: {
            type: true,
            value: true,
          },
        },
        address: true,
      },
    });
    const formattedAddress = `${foundProperty.address.street}, ${foundProperty.address.district}, ${foundProperty.address.city} - ${foundProperty.address.state}, ${foundProperty.address.zip_code}`;
    const users = await this.searchUser([
      {
        propertyName: "user_id",
        operator: FilterOperatorEnum.Eq,
        value: foundProperty.created_by_id,
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
        amount: foundProperty.details
          .filter((detail) => detail.type === DetailType.CHARGE)
          .reduce((acc, charge) => acc + charge.value, 0)
          .toString(),
        endereco_completo: formattedAddress,
        cidade: foundProperty.address.city,
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
