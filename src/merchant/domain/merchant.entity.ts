import { Entity, UniqueEntityId } from "#shared/domain";
export type MerchantProps = {
  id?: UniqueEntityId;
  example: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Merchant extends Entity<MerchantProps> {
  private _example: string;
  constructor(props: MerchantProps) {
    super(props);
    this._example = props.example;
  }

  get example(): string {
    return this._example;
  }
}
