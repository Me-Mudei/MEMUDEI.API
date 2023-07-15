import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import RuleValidatorFactory from "../validators/rule.validator";

export type RuleProps = {
  id?: UniqueEntityId;
  key: string;
  allowed: boolean;
  name?: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Rule extends Entity<RuleProps> {
  private _key: string;
  private _allowed: boolean;
  private _name?: string;
  private _description?: string;

  constructor(props: RuleProps) {
    Rule.validate(props);
    super(props);
    this._key = props.key;
    this._allowed = props.allowed;
    this._name = props.name;
    this._description = props.description;
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

  public get name(): string | undefined {
    return this._name;
  }

  public set name(_name: string | undefined) {
    this._name = _name;
  }

  public get description(): string | undefined {
    return this._description;
  }

  public set description(_description: string | undefined) {
    this._description = _description;
  }
}
