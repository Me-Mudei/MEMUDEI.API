import { Entity, UniqueEntityId } from '#shared/domain';

export type UserProps = {
  id?: UniqueEntityId;
  name: string;
  email: string;
  external_id?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }
}
