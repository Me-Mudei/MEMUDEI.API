import { Entity, UniqueEntityId } from "../../../shared/domain";

export type UserProps = {
  email: string;
  name: string;
  role_name: string;
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }
}
