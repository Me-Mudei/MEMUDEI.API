import { Entity, UniqueEntityId } from "#shared/domain";

export type UserProps = {
  id?: UniqueEntityId;
  name: string;
  email: string;
  external_id?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProps> {
  private _name: string;
  private _email: string;
  private _external_id?: string;
  constructor(props: UserProps) {
    super(props);
    this._name = props.name;
    this._email = props.email;
    this._external_id = props.external_id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get external_id(): string | undefined {
    return this._external_id;
  }
}
