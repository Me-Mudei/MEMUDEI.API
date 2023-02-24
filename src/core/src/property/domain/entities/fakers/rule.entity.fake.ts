import { Rule } from '../rule.entity';
import { Chance } from 'chance';
import { UniqueEntityId } from '#shared/domain';

type PropOrFactory<T> = T | ((index: number) => T);

export class RuleFakeBuilder<TBuild = any> {
  private _id = undefined;
  private _created_at = undefined;
  private _updated_at = undefined;
  private _key: PropOrFactory<string> = (_index) =>
    this.chance.word({ length: 10 });
  private _allowed: PropOrFactory<boolean | null> = (_index) => false;

  private countObjs: number;

  static aRule() {
    return new RuleFakeBuilder<Rule>();
  }

  static theRules(countObjs: number) {
    return new RuleFakeBuilder<Rule[]>(countObjs);
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
  withAllowed(valueOrFactory: PropOrFactory<boolean | null>) {
    this._allowed = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Rule({
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
          allowed: this.callFactory(this._allowed, index),
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
  get allowed() {
    return this.getValue('allowed');
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
      throw new Error(`Rule ${prop} not have a factory, use 'with' methods`);
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
