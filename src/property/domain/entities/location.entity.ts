import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import LocationValidatorFactory from "../validators/location.validator";

export type LocationProps = {
  id?: UniqueEntityId;
  lat: number;
  lng: number;
  created_at?: Date;
  updated_at?: Date;
};

export class Location extends Entity<LocationProps> {
  private _lat: number;
  private _lng: number;

  constructor(props: LocationProps) {
    Location.validate(props);
    super(props);
    this._lat = props.lat;
    this._lng = props.lng;
  }

  static validate(props: LocationProps) {
    const validator = LocationValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get lat(): number {
    return this._lat;
  }

  public set lat(_lat: number) {
    this._lat = _lat;
  }

  public get lng(): number {
    return this._lng;
  }

  public set lng(_lng: number) {
    this._lng = _lng;
  }
}
