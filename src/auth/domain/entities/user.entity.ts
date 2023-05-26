import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import UserValidatorFactory from '../validators/user.validator';

export type UserProps = {
  id?: UniqueEntityId;
  email: string;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProps> {
  private _email: string;

  constructor(props: UserProps) {
    User.validate(props);
    super(props);
    this._email = props.email;
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
}
