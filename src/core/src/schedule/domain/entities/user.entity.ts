import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import UserValidatorFactory from '../validators/user.validator';

export type UserProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    User.validate(props);
    super(props);
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
