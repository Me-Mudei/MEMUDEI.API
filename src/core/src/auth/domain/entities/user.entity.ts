import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import { Role } from './role.entity';
import UserValidatorFactory from '../validators/user.validator';

export type UserProps = {
  id?: UniqueEntityId;
  email: string;
  role: Role;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProps> {
  private _email: string;
  private _role: Role;

  constructor(props: UserProps) {
    User.validate(props);
    super(props);
    this._email = props.email;
    this._role = props.role;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get email(): string {
    return this._email;
  }

  public set email(_email: string) {
    this._email = _email;
  }

  public get role(): Role {
    return this._role;
  }

  public set role(_role: Role) {
    this._role = _role;
  }
}
