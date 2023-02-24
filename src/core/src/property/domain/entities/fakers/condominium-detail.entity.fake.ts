import { CondominiumDetail } from '../condominium-detail.entity';
import { Chance } from 'chance';
import { UniqueEntityId } from '#shared/domain';

type PropOrFactory<T> = T | ((index: number) => T);

export class CondominiumDetailFakeBuilder<TBuild = any> {
  private _id = undefined;
  private _created_at = undefined;
  private _updated_at = undefined;
  private _key: PropOrFactory<string> = (_index) =>
    this.chance.word({ length: 10 });
  private _available: PropOrFactory<boolean | null> = (_index) => false;

  private countObjs: number;

  static aCondominiumDetail() {
    return new CondominiumDetailFakeBuilder<CondominiumDetail>();
  }

  static theCondominiumDetails(countObjs: number) {
    return new CondominiumDetailFakeBuilder<CondominiumDetail[]>(countObjs);
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

  withKey(valueOrFactory: PropOrFactory<string>) {
    this._key = valueOrFactory;
    return this;
  }
  withAvailable(valueOrFactory: PropOrFactory<boolean | null>) {
    this._available = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new CondominiumDetail({
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
          available: this.callFactory(this._available, index),
        }),
    );
    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  get id() {
    return this.getValue('id');
  }

  get key() {
    return this.getValue('key');
  }
  get available() {
    return this.getValue('available');
  }

  get created_at() {
    return this.getValue('created_at');
  }

  get updated_at() {
    return this.getValue('updated_at');
  }

  private getValue(prop) {
    const optional = ['id', 'created_at', 'updated_at'];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `CondominiumDetail ${prop} not have a factory, use 'with' methods`,
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
