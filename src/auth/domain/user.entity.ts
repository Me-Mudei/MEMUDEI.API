import { Entity, UniqueEntityId } from "#shared/domain";

export enum AuthProvider {
  GOOGLE = "google",
  CREDENTIALS = "credentials",
}

export enum GlobalRole {
  ADMIN = "admin",
}

export type UserProps = {
  id?: UniqueEntityId;
  email: string;
  provider: AuthProvider;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProps> {
  private _email: string;
  private _provider: AuthProvider;
  private _password?: string;
  private _external_id?: string;
  constructor(props: UserProps) {
    super(props);
    this._email = props.email;
    this._provider = props.provider;
  }

  get email(): string {
    return this._email;
  }

  get provider(): AuthProvider {
    return this._provider;
  }

  get external_id(): string | undefined {
    return this._external_id;
  }

  set external_id(external_id: string) {
    this._external_id = external_id;
  }

  get password(): string | undefined {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }
}
