import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import { Permission } from './permission.entity';
import RoleValidatorFactory from '../validators/role.validator';

export type RoleProps = {
  id?: UniqueEntityId;
  name: string;
  permissions: Permission[];
  created_at?: Date;
  updated_at?: Date;
};

export class Role extends Entity<RoleProps> {
  private _name: string;
  private _permissions: Permission[];

  constructor(props: RoleProps) {
    Role.validate(props);
    super(props);
    this._name = props.name;
    this._permissions = props.permissions;
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

  public get permissions(): Permission[] {
    return this._permissions;
  }

  public set permissions(_permissions: Permission[]) {
    this._permissions = _permissions;
  }
}
