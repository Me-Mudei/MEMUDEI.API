import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import AddressValidatorFactory from "../validators/address.validator";

import { Location } from "./location.entity";

export type AddressProps = {
  id?: UniqueEntityId;
  zip_code: string;
  city: string;
  state: string;
  street: string;
  country: string;
  location: Location;
  district?: string;
  complement?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Address extends Entity<AddressProps> {
  private _zip_code: string;
  private _city: string;
  private _state: string;
  private _street: string;
  private _country: string;
  private _location: Location;
  private _district?: string;
  private _complement?: string;

  constructor(props: AddressProps) {
    Address.validate(props);
    super(props);
    this._zip_code = props.zip_code;
    this._city = props.city;
    this._state = props.state;
    this._street = props.street;
    this._country = props.country;
    this._location = props.location;
    this._district = props.district;
    this._complement = props.complement;
  }

  static validate(props: AddressProps) {
    const validator = AddressValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get zip_code(): string {
    return this._zip_code;
  }

  public set zip_code(_zip_code: string) {
    this._zip_code = _zip_code;
  }

  public get city(): string {
    return this._city;
  }

  public set city(_city: string) {
    this._city = _city;
  }

  public get state(): string {
    return this._state;
  }

  public set state(_state: string) {
    this._state = _state;
  }

  public get street(): string {
    return this._street;
  }

  public set street(_street: string) {
    this._street = _street;
  }

  public get country(): string {
    return this._country;
  }

  public set country(_country: string) {
    this._country = _country;
  }

  public get location(): Location {
    return this._location;
  }

  public set location(_location: Location) {
    this._location = _location;
  }

  public get district(): string {
    return this._district;
  }

  public set district(_district: string) {
    this._district = _district;
  }

  public get complement(): string {
    return this._complement;
  }

  public set complement(_complement: string) {
    this._complement = _complement;
  }
}
