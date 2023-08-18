import { Client } from "@hubspot/api-client";
import { configEnv } from "#shared/infra";
import { User } from "#user/domain";

import { CRM } from "./crm.interface";

export class HubspotCRM implements CRM {
  private client: Client;

  constructor() {
    this.client = new Client({
      accessToken: configEnv.crm.accessToken
    });
  }

  async createUser(user: User) {
    await this.client.crm.contacts.basicApi.create({
      properties: {
        user_id: user.id,
        firstname: user.name,
        email: user.email
      },
      associations: []
    });
  }

  async deleteUser(id: string) {
    await this.client.crm.contacts.basicApi.archive(id);
  }
}
