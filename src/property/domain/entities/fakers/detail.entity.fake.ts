import { UniqueEntityId } from "#shared/domain";
import { Chance } from "chance";

import { Detail, DetailType } from "../detail.entity";

type PropOrFactory<T> = T | ((index: number) => T);

export class DetailFakeBuilder<TBuild = any> {
  private _id: PropOrFactory<UniqueEntityId> = (_index) => new UniqueEntityId();
  private _created_at: PropOrFactory<Date> = (_index) => new Date();
  private _updated_at: PropOrFactory<Date> = (_index) => new Date();
  private _key: PropOrFactory<string> = (_index) =>
    this.chance.word({ length: 10 });
  private _type: PropOrFactory<DetailType> = (_index) => DetailType.PROPERTY;
  private _available: PropOrFactory<boolean | null> = (_index) => false;
  private _value: PropOrFactory<number> = (_index) => this.chance.integer();
  private _unit: PropOrFactory<string> = (_index) => this.chance.word();

  private countObjs: number;

  static aDetail() {
    return new DetailFakeBuilder<Detail>();
  }

  static theDetails(countObjs: number) {
    return new DetailFakeBuilder<Detail[]>(countObjs);
  }

  private chance: Chance.Chance;
  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withId(valueOrFactory: PropOrFactory<UniqueEntityId>) {
    this._id = valueOrFactory || undefined;
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

  withKey(valueOrFactory: PropOrFactory<string>) {
    this._key = valueOrFactory;
    return this;
  }

  withType(valueOrFactory: PropOrFactory<DetailType>) {
    this._type = valueOrFactory;
    return this;
  }

  withAvailable(valueOrFactory: PropOrFactory<boolean | null>) {
    this._available = valueOrFactory;
    return this;
  }

  withValue(valueOrFactory: PropOrFactory<number>) {
    this._value = valueOrFactory;
    return this;
  }

  withUnit(valueOrFactory: PropOrFactory<string>) {
    this._unit = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Detail({
          ...(this._id && {
            id: this.callFactory(this._id, index),
          }),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index),
          }),
          ...(this._updated_at && {
            updated_at: this.callFactory(this._updated_at, index),
          }),
          key: this.callFactory(this._key, index),
          type: this.callFactory(this._type, index),
          available: this.callFactory(this._available, index),
          value: this.callFactory(this._value, index),
          unit: this.callFactory(this._unit, index),
        }),
    );
    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  get id() {
    return this.getValue("id");
  }
  get key() {
    return this.getValue("key");
  }
  get type() {
    return this.getValue("type");
  }
  get available() {
    return this.getValue("available");
  }
  get value() {
    return this.getValue("value");
  }
  get unit() {
    return this.getValue("unit");
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
      throw new Error(`Detail ${prop} not have a factory, use 'with' methods`);
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === "function"
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
