import { Client } from "@hubspot/api-client";
import { configEnv } from "#shared/infra";

import { Crm } from "./crm.interface";

export class HubspotCrm implements Crm {
  private client: Client;

  constructor() {
    this.client = new Client({
      accessToken: configEnv.crm.accessToken
    });
  }

  async createUser(user: any) {
    const userCreated = await this.client.crm.contacts.basicApi.create({
      properties: {
        firstname: user.name,
        email: user.email,
        phone: user.phone
      },
      associations: []
    });
    return { id: userCreated.id };
  }

  async deleteUser(id: string) {
    await this.client.crm.contacts.basicApi.archive(id);
  }

  async createProperty(property: any) {
    const propertyCreated = await this.client.crm.deals.basicApi.create({
      properties: {
        nome: property.name,
        link: property.link
      },
      associations: [
        {
          to: {
            id: property.ownerId
          },
          types: [
            {
              associationTypeId: 0,
              associationCategory: "USER_DEFINED"
            }
          ]
        }
      ]
    });

    return { id: propertyCreated.id };
  }
}
