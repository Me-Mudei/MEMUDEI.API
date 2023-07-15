import { Rule } from "../../../domain";

export type RuleOutput = {
  id: string;
  key: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
};

export class RuleOutputMapper {
  static toOutput(entity: Rule): RuleOutput {
    return entity.toJSON();
  }
}
