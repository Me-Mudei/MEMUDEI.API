import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import PermissionValidatorFactory from '../validators/permission.validator';

export type PermissionProps = {
  id?: UniqueEntityId;
  name: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Permission extends Entity<PermissionProps> {
  private _name: string;

  constructor(props: PermissionProps) {
    Permission.validate(props);
    super(props);
    this._name = props.name;
  }

  static validate(props: PermissionProps) {
    const validator = PermissionValidatorFactory.create();
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
