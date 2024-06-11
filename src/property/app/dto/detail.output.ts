import { Detail, DetailType } from "../../domain";

export interface DetailOutput {
  id: string;
  type: DetailType;
  key: string;
  value?: number;
  unit?: string;
  available?: boolean;
  created_at: Date;
  updated_at: Date;
}

export class DetailOutputMapper {
  static toOutput(detail: Detail): DetailOutput {
    return {
      id: detail.id,
      type: detail.type,
      key: detail.key,
      value: detail.value,
      unit: detail.unit,
      available: detail.available,
      created_at: detail.created_at,
      updated_at: detail.updated_at,
    };
  }
}
