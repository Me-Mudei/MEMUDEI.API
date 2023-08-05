import { Client } from "@hubspot/api-client";
import { configEnv } from "#shared/infra";

export class HubspotCrm {
  private client: Client;

  constructor() {
    this.client = new Client({
      accessToken: configEnv.crm.accessToken
    });
  }

  createUser = async (email: string, firstName: string, lastName: string) => {};

  createProperty = async (
    name: string,
    label: string,
    description: string
  ) => {};

  createSchedule = async (
    name: string,
    label: string,
    description: string
  ) => {};

  validateSchedule = async (
    name: string,
    label: string,
    description: string
  ) => {};
}
