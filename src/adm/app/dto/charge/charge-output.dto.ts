import { Charge } from "../../../domain";

export type ChargeOutput = {
  id: string;
  key: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
};

export class ChargeOutputMapper {
  static toOutput(entity: Charge): ChargeOutput {
    return entity.toJSON();
  }
}
