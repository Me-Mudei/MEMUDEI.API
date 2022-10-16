import { Entity, UniqueEntityId } from '../../../shared/domain';

export type RuleProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class Rule extends Entity<RuleProps> {
  constructor(props: RuleProps) {
    super(props);
  }
}
