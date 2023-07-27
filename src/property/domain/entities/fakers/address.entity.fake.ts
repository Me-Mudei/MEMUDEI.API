import { UniqueEntityId } from "#shared/domain";
import { Chance } from "chance";

import { Address } from "../address.entity";
import { Location } from "../location.entity";

import { LocationFakeBuilder } from "./location.entity.fake";

type PropOrFactory<T> = T | ((index: number) => T);

export class AddressFakeBuilder<TBuild = any> {
  private _id = undefined;
  private _created_at = undefined;
  private _updated_at = undefined;
  private _zip_code: PropOrFactory<string> = (_index) =>
    this.chance.string({ length: 8, alpha: false, numeric: true });
  private _complement: PropOrFactory<string | null> = (_index) =>
    this.chance.word();
  private _city: PropOrFactory<string> = (_index) => this.chance.city();
  private _state: PropOrFactory<string> = (_index) => this.chance.state();
  private _street: PropOrFactory<string> = (_index) => this.chance.street();
  private _country: PropOrFactory<string> = (_index) => this.chance.country();
  private _district: PropOrFactory<string> = (_index) => this.chance.province();
  private _location: PropOrFactory<Location> = (_index) =>
    LocationFakeBuilder.aLocation().build();

  private countObjs: number;

  static aAddress() {
    return new AddressFakeBuilder<Address>();
  }

  static theAddresss(countObjs: number) {
    return new AddressFakeBuilder<Address[]>(countObjs);
  }

  private chance: Chance.Chance;

  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withId(valueOrFactory: PropOrFactory<UniqueEntityId>) {
    this._id = valueOrFactory;
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  withUpdatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._updated_at = valueOrFactory;
    return this;
  }

  withZipCode(valueOrFactory: PropOrFactory<string>) {
    this._zip_code = valueOrFactory;
    return this;
  }

  withComplement(valueOrFactory: PropOrFactory<string | null>) {
    this._complement = valueOrFactory;
    return this;
  }

  whitCity(valueOrFactory: PropOrFactory<string>) {
    this._city = valueOrFactory;
    return this;
  }

  whitState(valueOrFactory: PropOrFactory<string>) {
    this._state = valueOrFactory;
    return this;
  }

  whitStreet(valueOrFactory: PropOrFactory<string>) {
    this._street = valueOrFactory;
    return this;
  }

  whitCountry(valueOrFactory: PropOrFactory<string>) {
    this._country = valueOrFactory;
    return this;
  }

  whitDistrict(valueOrFactory: PropOrFactory<string>) {
    this._district = valueOrFactory;
    return this;
  }

  whitLocation(valueOrFactory: PropOrFactory<Location>) {
    this._location = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Address({
          ...(this._id && {
            id: this.callFactory(this._id, index)
          }),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index)
          }),
          ...(this._updated_at && {
            updated_at: this.callFactory(this._updated_at, index)
          }),
          zip_code: this.callFactory(this._zip_code, index),
          complement: this.callFactory(this._complement, index),
          city: this.callFactory(this._city, index),
          state: this.callFactory(this._state, index),
          street: this.callFactory(this._street, index),
          country: this.callFactory(this._country, index),
          location: this.callFactory(this._location, index),
          district: this.callFactory(this._district, index)
        })
    );
    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  get id() {
    return this.getValue("id");
  }

  get zip_code() {
    return this.getValue("zip_code");
  }

  get complement() {
    return this.getValue("complement");
  }

  get city() {
    return this.getValue("city");
  }

  get state() {
    return this.getValue("state");
  }

  get street() {
    return this.getValue("street");
  }

  get country() {
    return this.getValue("country");
  }

  get location() {
    return this.getValue("location");
  }

  get district() {
    return this.getValue("district");
  }

  get created_at() {
    return this.getValue("created_at");
  }

  get updated_at() {
    return this.getValue("updated_at");
  }

  private getValue(prop) {
    const optional = ["id", "created_at", "updated_at"];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(`Address ${prop} not have a factory, use 'with' methods`);
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === "function"
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
