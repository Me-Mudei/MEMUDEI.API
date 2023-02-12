import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import RuleValidatorFactory from '../validators/rule.validator';

export type RuleProps = {
  id?: UniqueEntityId;
  allowed: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export class Rule extends Entity<RuleProps> {
  private _name: string;
  private _allowed: boolean;
  private _description?: string;

  constructor(props: RuleProps) {
    Rule.validate(props);
    super(props);
    this._allowed = props.allowed;
  }

  static validate(props: RuleProps) {
    const validator = RuleValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get allowed(): boolean {
    return this._allowed;
  }

  public set allowed(_allowed: boolean) {
    this._allowed = _allowed;
  }
}
