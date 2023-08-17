import { Property } from "#property/domain";

export interface CRM {
  createProperty(property: Property): Promise<void>;
  deleteProperty(id: string): Promise<void>;
}
