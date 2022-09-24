import Entity from "../../../shared/domain/entity/entity";
import UniqueEntityId from "../../../shared/domain/value-objects/unique-entity-id.vo";

export type UserProps = {
  email: string;
  name: string;
  role_name: string;
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export default class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }
}
