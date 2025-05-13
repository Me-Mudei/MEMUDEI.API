import { Merchant } from "../../domain";

export interface MerchantOutput {
  id: string;
  company_name: string;
  organization_id: string;
  created_at: Date;
  updated_at: Date;
}

export class MerchantOutputMapper {
  static toOutput(merchant: Merchant): MerchantOutput {
    return {
      id: merchant.id,
      company_name: merchant.company_name,
      organization_id: merchant.organization_id,
      created_at: merchant.created_at,
      updated_at: merchant.updated_at,
    };
  }
}
