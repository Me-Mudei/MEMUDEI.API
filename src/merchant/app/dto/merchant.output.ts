export interface MerchantOutput {
  id: string;
  example: string;
  created_at: Date;
  updated_at: Date;
}

export class MerchantOutputMapper {
  static toOutput(entity: any): MerchantOutput {
    return {
      id: entity.id,
      example: entity.example,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }
}
