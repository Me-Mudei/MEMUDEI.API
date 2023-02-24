import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import RuleValidatorFactory from '../validators/rule.validator';

export type RuleProps = {
  id?: UniqueEntityId;
  key: string;
  allowed: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export class Rule extends Entity<RuleProps> {
  private _key: string;
  private _allowed: boolean;

  constructor(props: RuleProps) {
    Rule.validate(props);
    super(props);
    this._key = props.key;
    this._allowed = props.allowed;
  }

  static validate(props: RuleProps) {
    const validator = RuleValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
  public get key(): string {
    return this._key;
  }

  public set key(_key: string) {
    this._key = _key;
  }
  public get allowed(): boolean {
    return this._allowed;
  }

  public set allowed(_allowed: boolean) {
    this._allowed = _allowed;
  }
}
