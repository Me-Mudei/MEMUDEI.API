import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import RuleValidatorFactory from '../validators/rule.validator';

export type RuleProps = {
  id?: UniqueEntityId;
  name: string;
  allowed?: boolean;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Rule extends Entity<RuleProps> {
  private _name: string;
  private _allowed?: boolean;
  private _description?: string;

  constructor(props: RuleProps) {
    Rule.validate(props);
    super(props);
    this._name = props.name;
    this._allowed = props.allowed;
    this._description = props.description;
  }

  static validate(props: RuleProps) {
    const validator = RuleValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get name(): string {
    return this._name;
  }

  public set name(_name: string) {
    this._name = _name;
  }

  public get allowed(): boolean {
    return this._allowed;
  }

  public set allowed(_allowed: boolean) {
    this._allowed = _allowed;
  }

  public get description(): string {
    return this._description;
  }

  public set description(_description: string) {
    this._description = _description;
  }
}
