import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import MerchantValidatorFactory from "../validators/merchant.validator";
export type MerchantProps = {
  id?: UniqueEntityId;
  company_name: string;
  organization_id: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Merchant extends Entity<MerchantProps> {
  private _company_name: string;
  private _organization_id: string;

  constructor(readonly props: MerchantProps) {
    Merchant.validate(props);
    super(props);
    this._company_name = props.company_name;
    this._organization_id = props.organization_id;
  }

  static validate(props: MerchantProps) {
    const validator = MerchantValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get company_name() {
    return this._company_name;
  }
  set company_name(company_name) {
    this._company_name = company_name;
  }
  get organization_id() {
    return this._organization_id;
  }
  set organization_id(organization_id) {
    this._organization_id = organization_id;
  }
}
