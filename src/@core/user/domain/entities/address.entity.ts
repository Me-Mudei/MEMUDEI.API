import Entity from "@core/@shared/domain/entity/entity";
import UniqueEntityId from "@core/@shared/domain/value-objects/unique-entity-id.vo";
import Location from "./location.entity";

export type AddressProps = {
  street: string;
  number: string;
  country: string;
  zip_code: string;
  neighborhood?: string;
  complement?: string;
  city?: string;
  state?: string;
  location?: Location;
};

export default class Address extends Entity<AddressProps> {
  constructor(readonly props: AddressProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
