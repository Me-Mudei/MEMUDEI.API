import { Entity, UniqueEntityId } from '../../../shared/domain';
import { Address } from './address.entity';
import { PropertyType } from './property-type.entity';
import { PropertyRelationship } from './property-relationship.entity';
import { PrivacyType } from './privacy-type.entity';
import { FloorPlan } from './floor-plan.entity';
import { Schedule } from './schedule.entity';
import { PropertyDetail } from './property-detail.entity';
import { CondominiumDetail } from './condominium-detail.entity';
import { Rule } from './rule.entity';
import { Photo } from './photo.entity';
import { Charge } from './charge.entity';
import { Report } from './report.entity';

export type PropertyStatus = 'pending' | 'complete';

export type PropertyProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
  status?: PropertyStatus;
  title?: string;
  description?: string;
  address?: Address;
  property_type?: PropertyType;
  property_relationship?: PropertyRelationship;
  privacy_type?: PrivacyType;
  floor_plan?: FloorPlan;
  schedule?: Schedule;
  property_details?: PropertyDetail[];
  condominium_details?: CondominiumDetail[];
  rules?: Rule[];
  photos?: Photo[];
  charges?: Charge[];
  reports?: Report[];
};

export class Property extends Entity<PropertyProps> {
  private _title?: string;
  private _description?: string;
  private _status: PropertyStatus;
  private _disabled_at?: Date;
  private _deleted_at?: Date;
  private _address?: Address;
  private _property_type?: PropertyType;
  private _property_relationship?: PropertyRelationship;
  private _privacy_type?: PrivacyType;
  private _floor_plan?: FloorPlan;
  private _schedule?: Schedule;
  private _property_details?: PropertyDetail[];
  private _condominium_details?: CondominiumDetail[];
  private _rules?: Rule[];
  private _photos?: Photo[];
  private _charges?: Charge[];
  private _reports?: Report[];

  constructor(readonly props: PropertyProps) {
    super(props);
    this._title = props.title;
    this._description = props.description;
    this._status = props.status || 'pending';
    this._address = props.address;
    this._property_type = props.property_type;
    this._property_relationship = props.property_relationship;
    this._privacy_type = props.privacy_type;
    this._floor_plan = props.floor_plan;
    this._schedule = props.schedule;
    this._property_details = props.property_details;
    this._condominium_details = props.condominium_details;
    this._rules = props.rules;
    this._photos = props.photos;
    this._charges = props.charges;
    this._reports = props.reports;
  }

  get title() {
    return this._title;
  }
  get description() {
    return this._description;
  }
  get status() {
    return this._status;
  }
  get disabled_at() {
    return this._disabled_at;
  }
  get deleted_at() {
    return this._deleted_at;
  }
  get address() {
    return this._address;
  }
  get property_type() {
    return this._property_type;
  }
  get property_relationship() {
    return this._property_relationship;
  }
  get privacy_type() {
    return this._privacy_type;
  }
  get floor_plan() {
    return this._floor_plan;
  }
  get schedule() {
    return this._schedule;
  }
  get property_details() {
    return this._property_details;
  }
  get condominium_details() {
    return this._condominium_details;
  }
  get rules() {
    return this._rules;
  }
  get photos() {
    return this._photos;
  }
  get charges() {
    return this._charges;
  }
  get reports() {
    return this._reports;
  }
}
