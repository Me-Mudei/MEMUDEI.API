import Entity from "@core/@shared/domain/entity/entity";
import UniqueEntityId from "@core/@shared/domain/value-objects/unique-entity-id.vo";
import Address from "./address.entity";

export type UserProps = {
  email: string;
  name: string;
  role_name: string;
  phone?: string;
  born?: Date;
  address?: Address;
  description?: string | null;
  disabled_at?: Date;
  deleted_at?: Date;
};

export default class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  deleteUser() {
    this.props.deleted_at = new Date();
  }

  disableUser() {
    this.props.disabled_at = new Date();
  }
}
