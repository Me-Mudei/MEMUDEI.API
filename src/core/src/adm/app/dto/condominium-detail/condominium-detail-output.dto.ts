import { CondominiumDetail } from '../../../domain';

export type CondominiumDetailOutput = {
  id: string;
  key: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
};

export class CondominiumDetailOutputMapper {
  static toOutput(entity: CondominiumDetail): CondominiumDetailOutput {
    return entity.toJSON();
  }
}
