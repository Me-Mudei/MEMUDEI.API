import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import RoleValidatorFactory from '../validators/role.validator';

export type RoleProps = {
  id?: UniqueEntityId;
  name: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Role extends Entity<RoleProps> {
  private _name: string;

  constructor(props: RoleProps) {
    Role.validate(props);
    super(props);
    this._name = props.name;
  }

  static validate(props: RoleProps) {
    const validator = RoleValidatorFactory.create();
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
}
