import { UniqueEntityId } from "#shared/domain";
import { Chance } from "chance";

import { Location } from "../location.entity";

type PropOrFactory<T> = T | ((index: number) => T);

export class LocationFakeBuilder<TBuild = any> {
  private _id = undefined;
  private _created_at = undefined;
  private _updated_at = undefined;
  private _lat: PropOrFactory<number> = (_index) => this.chance.latitude();
  private _lng: PropOrFactory<number> = (_index) => this.chance.longitude();

  private countObjs: number;

  static aLocation() {
    return new LocationFakeBuilder<Location>();
  }

  static theLocations(countObjs: number) {
    return new LocationFakeBuilder<Location[]>(countObjs);
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

  withLat(valueOrFactory: PropOrFactory<number>) {
    this._lat = valueOrFactory;
    return this;
  }

  withLng(valueOrFactory: PropOrFactory<number>) {
    this._lng = valueOrFactory;
    return this;
  }
  build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Location({
          ...(this._id && {
            id: this.callFactory(this._id, index),
          }),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index),
          }),
          ...(this._updated_at && {
            updated_at: this.callFactory(this._updated_at, index),
          }),
          lat: this.callFactory(this._lat, index),
          lng: this.callFactory(this._lng, index),
        }),
    );
    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  get id() {
    return this.getValue("id");
  }

  get lat() {
    return this.getValue("lat");
  }

  get lng() {
    return this.getValue("lng");
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
      throw new Error(
        `Location ${prop} not have a factory, use 'with' methods`,
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === "function"
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
