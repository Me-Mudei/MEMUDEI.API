import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import UserValidatorFactory from "../validators/user.validator";

export type UserProps = {
  id?: UniqueEntityId;
  name: string;
  email: string;
  phone: string;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProps> {
  private _name: string;
  private _email: string;
  private _phone: string;
  constructor(props: UserProps) {
    User.validate(props);
    super(props);
    this._name = props.name;
    this._email = props.email;
    this._phone = props.phone;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get phone() {
    return this._phone;
  }
}
