import { FloorPlan } from '../floor-plan.entity';
import { Chance } from 'chance';
import { UniqueEntityId } from '#shared/domain';

type PropOrFactory<T> = T | ((index: number) => T);

export class FloorPlanFakeBuilder<TBuild = any> {
  private _id = undefined;
  private _created_at = undefined;
  private _updated_at = undefined;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _unit: PropOrFactory<string | null> = (_index) =>
    this.chance.syllable();

  private countObjs: number;

  static aFloorPlan() {
    return new FloorPlanFakeBuilder<FloorPlan>();
  }

  static theFloorPlans(countObjs: number) {
    return new FloorPlanFakeBuilder<FloorPlan[]>(countObjs);
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

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withUnit(valueOrFactory: PropOrFactory<string | null>) {
    this._unit = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new FloorPlan({
          ...(this._id && {
            id: this.callFactory(this._id, index),
          }),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index),
          }),
          ...(this._updated_at && {
            updated_at: this.callFactory(this._updated_at, index),
          }),
          name: this.callFactory(this._name, index),
          unit: this.callFactory(this._unit, index),
        }),
    );
    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  get id() {
    return this.getValue('id');
  }

  get name() {
    return this.getValue('name');
  }

  get unit() {
    return this.getValue('unit');
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
        `FloorPlan ${prop} not have a factory, use 'with' methods`,
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
