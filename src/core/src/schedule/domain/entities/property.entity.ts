import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import PropertyValidatorFactory from '../validators/property.validator';
import { User } from './';

export type PropertyProps = {
  id?: UniqueEntityId;
  owner: User;
  created_at?: Date;
  updated_at?: Date;
};

export class Property extends Entity<PropertyProps> {
  private _owner: User;
  constructor(props: PropertyProps) {
    Property.validate(props);
    super(props);
    this._owner = props.owner;
  }

  static validate(props: PropertyProps) {
    const validator = PropertyValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get owner(): User {
    return this._owner;
  }

  public set owner(owner: User) {
    this._owner = owner;
  }
}
