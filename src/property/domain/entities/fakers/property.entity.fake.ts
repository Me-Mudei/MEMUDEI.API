import { UniqueEntityId } from "#shared/domain";
import { Chance } from "chance";

import { Property, PropertyStatus, PropertyType } from "../property.entity";

type PropOrFactory<T> = T | ((index: number) => T);

export class PropertyFakeBuilder<TBuild = any> {
  private _id = undefined;
  private _created_at = undefined;
  private _updated_at = undefined;
  private _title: PropOrFactory<string> = (_index) => this.chance.word();
  private _description: PropOrFactory<string | null> = (_index) =>
    this.chance.sentence({ words: 10 });
  private _status: PropOrFactory<PropertyStatus | null> = (_index) =>
    PropertyStatus.PENDING;
  private _property_type: PropOrFactory<PropertyType> = (_index) =>
    PropertyType.APARTMENT;

  private countObjs: number;

  static aProperty() {
    return new PropertyFakeBuilder<Property>();
  }

  static theProperties(countObjs: number) {
    return new PropertyFakeBuilder<Property[]>(countObjs);
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

  withTitle(valueOrFactory: PropOrFactory<string>) {
    this._title = valueOrFactory;
    return this;
  }

  withDescription(valueOrFactory: PropOrFactory<string | null>) {
    this._description = valueOrFactory;
    return this;
  }

  withStatus(valueOrFactory: PropOrFactory<PropertyStatus | null>) {
    this._status = valueOrFactory;
    return this;
  }

  withPropertyType(valueOrFactory: PropOrFactory<PropertyType>) {
    this._property_type = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Property({
          ...(this._id && {
            id: this.callFactory(this._id, index),
          }),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index),
          }),
          ...(this._updated_at && {
            updated_at: this.callFactory(this._updated_at, index),
          }),
          title: this.callFactory(this._title, index),
          description: this.callFactory(this._description, index),
          status: this.callFactory(this._status, index),
          property_type: this.callFactory(this._property_type, index),
        }),
    );
    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  get id() {
    return this.getValue("id");
  }
  get created_at() {
    return this.getValue("created_at");
  }
  get updated_at() {
    return this.getValue("updated_at");
  }
  get title() {
    return this.getValue("title");
  }

  get description() {
    return this.getValue("description");
  }
  get property_type() {
    return this.getValue("property_type");
  }

  private getValue(prop) {
    const optional = ["id", "created_at", "updated_at"];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`,
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
