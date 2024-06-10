export interface MerchantOutput {
  id: string;
  company_name: string;
  created_at: Date;
  updated_at: Date;
}

export class MerchantOutputMapper {
  static toOutput(entity: any): MerchantOutput {
    return {
      id: entity.id,
      company_name: entity.company_name,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }
}
