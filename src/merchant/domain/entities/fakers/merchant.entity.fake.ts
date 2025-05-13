import { UniqueEntityId } from "#shared/domain";
import { Chance } from "chance";
import { nanoid } from "nanoid";

import { Merchant } from "../merchant.entity";

type PropOrFactory<T> = T | ((index: number) => T);

export class MerchantFakeBuilder<TBuild = any> {
  private _id = undefined;
  private _created_at = undefined;
  private _updated_at = undefined;
  private _company_name: PropOrFactory<string> = (_index) => this.chance.word();
  private _organization_id: PropOrFactory<string | null> = (_index) => nanoid();

  private countObjs: number;

  static aMerchant() {
    return new MerchantFakeBuilder<Merchant>();
  }

  static theProperties(countObjs: number) {
    return new MerchantFakeBuilder<Merchant[]>(countObjs);
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

  withCompanyName(valueOrFactory: PropOrFactory<string>) {
    this._company_name = valueOrFactory;
    return this;
  }

  withOrganizationId(valueOrFactory: PropOrFactory<string | null>) {
    this._organization_id = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Merchant({
          ...(this._id && {
            id: this.callFactory(this._id, index),
          }),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index),
          }),
          ...(this._updated_at && {
            updated_at: this.callFactory(this._updated_at, index),
          }),
          company_name: this.callFactory(this._company_name, index),
          organization_id: this.callFactory(this._organization_id, index),
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
  get company_name() {
    return this.getValue("company_name");
  }

  get organization_id() {
    return this.getValue("organization_id");
  }

  private getValue(prop) {
    const optional = ["id", "created_at", "updated_at"];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Merchant ${prop} not have a factory, use 'with' methods`,
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
