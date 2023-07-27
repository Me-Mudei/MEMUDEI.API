import { PrivacyType } from "../../../domain";

export type PrivacyTypeOutput = {
  id: string;
  key: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
};

export class PrivacyTypeOutputMapper {
  static toOutput(entity: PrivacyType): PrivacyTypeOutput {
    return entity.toJSON();
  }
}
