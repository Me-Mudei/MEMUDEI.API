import { Entity, UniqueEntityId } from "#shared/domain";
export type MerchantProps = {
  id?: UniqueEntityId;
  company_name: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Merchant extends Entity<MerchantProps> {
  private _company_name: string;
  constructor(props: MerchantProps) {
    super(props);
    this._company_name = props.company_name;
  }

  get company_name(): string {
    return this._company_name;
  }
}
