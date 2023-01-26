import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import { Address } from './address.entity';
import { PropertyType } from './property-type.entity';
import { PropertyRelationship } from './property-relationship.entity';
import { PrivacyType } from './privacy-type.entity';
import { FloorPlan } from './floor-plan.entity';
import { PropertyDetail } from './property-detail.entity';
import { CondominiumDetail } from './condominium-detail.entity';
import { Rule } from './rule.entity';
import { Photo } from './photo.entity';
import { Charge } from './charge.entity';
import PropertyValidatorFactory from '../validators/property.validator';

export enum PropertyStatus {
  PENDING = 'pending',
  COMPLETE = 'complete',
}

export type PropertyProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
  status?: PropertyStatus;
  title: string;
  description: string;
  address: Address;
  property_type: PropertyType;
  property_relationship: PropertyRelationship;
  privacy_type: PrivacyType;
  floor_plans: FloorPlan[];
  property_details: PropertyDetail[];
  condominium_details: CondominiumDetail[];
  rules: Rule[];
  photos?: Photo[];
  charges: Charge[];
};

export class Property extends Entity<PropertyProps> {
  private _title: string;
  private _description: string;
  private _status: PropertyStatus;
  private _address: Address;
  private _property_type: PropertyType;
  private _property_relationship: PropertyRelationship;
  private _privacy_type: PrivacyType;
  private _floor_plans: FloorPlan[];
  private _property_details: PropertyDetail[];
  private _condominium_details: CondominiumDetail[];
  private _rules: Rule[];
  private _photos?: Photo[];
  private _charges: Charge[];
  private _disabled_at?: Date;
  private _deleted_at?: Date;

  constructor(readonly props: PropertyProps) {
    Property.validate(props);
    super(props);
    this._title = props.title;
    this._description = props.description;
    this._status = props.status || PropertyStatus.PENDING;
    this._address = props.address;
    this._property_type = props.property_type;
    this._property_relationship = props.property_relationship;
    this._privacy_type = props.privacy_type;
    this._floor_plans = props.floor_plans;
    this._property_details = props.property_details;
    this._condominium_details = props.condominium_details;
    this._rules = props.rules;
    this._photos = props.photos;
    this._charges = props.charges;
  }

  static validate(props: PropertyProps) {
    const validator = PropertyValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get title() {
    return this._title;
  }
  set title(title) {
    this._title = title;
  }
  get description() {
    return this._description;
  }
  set description(description) {
    this._description = description;
  }
  get status() {
    return this._status;
  }
  set status(status) {
    this._status = status;
  }
  get disabled_at() {
    return this._disabled_at;
  }
  set disabled_at(disabled_at) {
    this._disabled_at = disabled_at;
  }
  get deleted_at() {
    return this._deleted_at;
  }
  set deleted_at(deleted_at) {
    this._deleted_at = deleted_at;
  }
  get address() {
    return this._address;
  }
  set address(address) {
    this._address = address;
  }
  get property_type() {
    return this._property_type;
  }
  set property_type(property_type) {
    this._property_type = property_type;
  }
  get property_relationship() {
    return this._property_relationship;
  }
  set property_relationship(property_relationship) {
    this._property_relationship = property_relationship;
  }
  get privacy_type() {
    return this._privacy_type;
  }
  set privacy_type(privacy_type) {
    this._privacy_type = privacy_type;
  }
  get floor_plans() {
    return this._floor_plans;
  }
  set floor_plans(floor_plans) {
    this._floor_plans = floor_plans;
  }
  get property_details() {
    return this._property_details;
  }
  set property_details(property_details) {
    this._property_details = property_details;
  }
  get condominium_details() {
    return this._condominium_details;
  }
  set condominium_details(condominium_details) {
    this._condominium_details = condominium_details;
  }
  get rules() {
    return this._rules;
  }
  set rules(rules) {
    this._rules = rules;
  }
  get photos() {
    return this._photos;
  }
  set photos(photos) {
    this._photos = photos;
  }
  get charges() {
    return this._charges;
  }
  set charges(charges) {
    this._charges = charges;
  }
}
