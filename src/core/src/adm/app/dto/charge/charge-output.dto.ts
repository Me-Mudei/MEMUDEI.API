import { Charge } from '../../../domain';

export type ChargeOutput = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export class ChargeOutputMapper {
  static toOutput(entity: Charge): ChargeOutput {
    return entity.toJSON();
  }
}
