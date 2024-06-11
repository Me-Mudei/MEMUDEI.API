import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import PropertyValidatorFactory from "../validators/property.validator";

export enum PropertyStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  PUBLISHED = "PUBLISHED",
  REJECTED = "REJECTED",
  UNPUBLISHED = "UNPUBLISHED",
  DEACTIVATED = "DEACTIVATED",
}

export enum PropertyType {
  HOUSE = "HOUSE",
  APARTMENT = "APARTMENT",
  COMMERCIAL = "COMMERCIAL",
  RURAL = "RURAL",
  OTHER = "OTHER",
}

export type PropertyProps = {
  id?: UniqueEntityId;
  title: string;
  description: string;
  property_type: PropertyType;
  status?: PropertyStatus;
  created_at?: Date;
  updated_at?: Date;
};

export class Property extends Entity<PropertyProps> {
  private _title: string;
  private _description: string;
  private _status: PropertyStatus;
  private _property_type: PropertyType;
  private _disabled_at?: Date;
  private _deleted_at?: Date;

  constructor(readonly props: PropertyProps) {
    Property.validate(props);
    super(props);
    this._title = props.title;
    this._description = props.description;
    this._status = props.status || PropertyStatus.PENDING;
    this._property_type = props.property_type;
  }

  static validate(props: PropertyProps) {
    const validator = PropertyValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get title() {
    return this._title;
  }
  set title(title) {
    this._title = title;
  }
  get description() {
    return this._description;
  }
  set description(description) {
    this._description = description;
  }
  get status() {
    return this._status;
  }
  set status(status) {
    this._status = status;
  }
  get disabled_at() {
    return this._disabled_at;
  }
  set disabled_at(disabled_at) {
    this._disabled_at = disabled_at;
  }
  get deleted_at() {
    return this._deleted_at;
  }
  set deleted_at(deleted_at) {
    this._deleted_at = deleted_at;
  }
  get property_type() {
    return this._property_type;
  }
  set property_type(property_type) {
    this._property_type = property_type;
  }
}
