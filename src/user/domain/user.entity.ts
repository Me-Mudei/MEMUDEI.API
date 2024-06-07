import { Entity, UniqueEntityId } from "#shared/domain";
export type UserProps = {
  id?: UniqueEntityId;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProps> {
  private _name: string;
  private _email: string;
  constructor(props: UserProps) {
    super(props);
    this._name = props.name;
    this._email = props.email;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }
}
