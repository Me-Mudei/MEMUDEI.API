import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../shared/domain';
import PropertyValidatorFactory from '../validators/property.validator';

export type PropertyProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class Property extends Entity<PropertyProps> {
  constructor(props: PropertyProps) {
    Property.validate(props);
    super(props);
  }

  static validate(props: PropertyProps) {
    const validator = PropertyValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
