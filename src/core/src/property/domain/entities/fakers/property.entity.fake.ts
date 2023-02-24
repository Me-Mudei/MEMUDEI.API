import { Property, PropertyStatus } from '../property.entity';
import { Chance } from 'chance';
import { UniqueEntityId } from '#shared/domain';
import {
  Address,
  FloorPlan,
  PropertyDetail,
  CondominiumDetail,
  Rule,
  Photo,
  Charge,
} from '../';

import {
  AddressFakeBuilder,
  FloorPlanFakeBuilder,
  PropertyDetailFakeBuilder,
  CondominiumDetailFakeBuilder,
  RuleFakeBuilder,
  PhotoFakeBuilder,
  ChargeFakeBuilder,
} from './';

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
  private _property_type: PropOrFactory<string> = (_index) =>
    this.chance.word({ length: 5 });
  private _property_relationship: PropOrFactory<string> = (_index) =>
    this.chance.word({ length: 5 });
  private _privacy_type: PropOrFactory<string> = (_index) =>
    this.chance.word({ length: 5 });
  private _address: PropOrFactory<Address> = (_index) =>
    AddressFakeBuilder.aAddress().build();
  private _floor_plans: PropOrFactory<FloorPlan[]> = (_index) =>
    FloorPlanFakeBuilder.theFloorPlans(3).build();
  private _property_details: PropOrFactory<PropertyDetail[]> = (_index) =>
    PropertyDetailFakeBuilder.thePropertyDetails(3).build();
  private _condominium_details: PropOrFactory<CondominiumDetail[]> = (_index) =>
    CondominiumDetailFakeBuilder.theCondominiumDetails(3).build();
  private _rules: PropOrFactory<Rule[]> = (_index) =>
    RuleFakeBuilder.theRules(3).build();
  private _photos: PropOrFactory<Photo[] | null> = (_index) =>
    PhotoFakeBuilder.thePhotos(3).build();
  private _charges: PropOrFactory<Charge[]> = (_index) =>
    ChargeFakeBuilder.theCharges(3).build();

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

  withAddress(valueOrFactory: PropOrFactory<Address>) {
    this._address = valueOrFactory;
    return this;
  }
  withPropertyTypeKey(valueOrFactory: PropOrFactory<string>) {
    this._property_type = valueOrFactory;
    return this;
  }
  withPropertyRelationshipKey(valueOrFactory: PropOrFactory<string>) {
    this._property_relationship = valueOrFactory;
    return this;
  }
  withPrivacyTypeKey(valueOrFactory: PropOrFactory<string>) {
    this._privacy_type = valueOrFactory;
    return this;
  }
  withFloorPlans(valueOrFactory: PropOrFactory<FloorPlan[]>) {
    this._floor_plans = valueOrFactory;
    return this;
  }
  withPropertyDetails(valueOrFactory: PropOrFactory<PropertyDetail[]>) {
    this._property_details = valueOrFactory;
    return this;
  }
  withCondominiumDetails(valueOrFactory: PropOrFactory<CondominiumDetail[]>) {
    this._condominium_details = valueOrFactory;
    return this;
  }
  withRules(valueOrFactory: PropOrFactory<Rule[]>) {
    this._rules = valueOrFactory;
    return this;
  }
  withPhotos(valueOrFactory: PropOrFactory<Photo[] | null>) {
    this._photos = valueOrFactory;
    return this;
  }
  withCharges(valueOrFactory: PropOrFactory<Charge[]>) {
    this._charges = valueOrFactory;
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
          address: this.callFactory(this._address, index),
          property_type: this.callFactory(this._property_type, index),
          property_relationship: this.callFactory(
            this._property_relationship,
            index,
          ),
          privacy_type: this.callFactory(this._privacy_type, index),
          floor_plans: this.callFactory(this._floor_plans, index),
          property_details: this.callFactory(this._property_details, index),
          condominium_details: this.callFactory(
            this._condominium_details,
            index,
          ),
          rules: this.callFactory(this._rules, index),
          photos: this.callFactory(this._photos, index),
          charges: this.callFactory(this._charges, index),
        }),
    );
    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  get id() {
    return this.getValue('id');
  }
  get created_at() {
    return this.getValue('created_at');
  }
  get updated_at() {
    return this.getValue('updated_at');
  }
  get title() {
    return this.getValue('title');
  }

  get description() {
    return this.getValue('description');
  }

  get address() {
    return this.getValue('address');
  }
  get property_type() {
    return this.getValue('property_type');
  }
  get property_relationship() {
    return this.getValue('property_relationship');
  }
  get privacy_type() {
    return this.getValue('privacy_type');
  }
  get floor_plans() {
    return this.getValue('floor_plans');
  }
  get property_details() {
    return this.getValue('property_details');
  }
  get condominium_details() {
    return this.getValue('condominium_details');
  }
  get rules() {
    return this.getValue('rules');
  }
  get photos() {
    return this.getValue('photos');
  }
  get charges() {
    return this.getValue('charges');
  }

  private getValue(prop) {
    const optional = ['id', 'created_at', 'updated_at'];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`,
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
