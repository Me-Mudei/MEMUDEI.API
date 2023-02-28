import { Role } from '../role.entity';
import { Chance } from 'chance';
import { UniqueEntityId } from '#shared/domain';
import { Permission } from '../permission.entity';
import { PermissionFakeBuilder } from './permission.entity.fake';

type PropOrFactory<T> = T | ((index: number) => T);

export class RoleFakeBuilder<TBuild = any> {
  private _id = undefined;
  private _created_at = undefined;
  private _updated_at = undefined;
  private _name: PropOrFactory<string> = (_index) =>
    this.chance.word({ length: 10 });
  private _permissions: PropOrFactory<Permission> = (_index) =>
    PermissionFakeBuilder.aPermission().build();

  private countObjs: number;

  static aRole() {
    return new RoleFakeBuilder<Role>();
  }

  static theRoles(countObjs: number) {
    return new RoleFakeBuilder<Role[]>(countObjs);
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

  withPermissions(valueOrFactory: PropOrFactory<Permission>) {
    this._permissions = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Role({
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
          permissions: this.callFactory(this._permissions, index),
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

  get permissions() {
    return this.getValue('permissions');
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
      throw new Error(`Role ${prop} not have a factory, use 'with' methods`);
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
