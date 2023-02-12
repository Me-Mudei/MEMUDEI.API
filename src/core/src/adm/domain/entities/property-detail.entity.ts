import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import PropertyDetailValidatorFactory from '../validators/property-detail.validator';

export type PropertyDetailProps = {
  id?: UniqueEntityId;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class PropertyDetail extends Entity<PropertyDetailProps> {
  private _name: string;
  private _description?: string;

  constructor(props: PropertyDetailProps) {
    PropertyDetail.validate(props);
    super(props);
    this._name = props.name;
    this._description = props.description;
  }

  static validate(props: PropertyDetailProps) {
    const validator = PropertyDetailValidatorFactory.create();
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

  public get description(): string {
    return this._description;
  }

  public set description(_description: string) {
    this._description = _description;
  }
}
