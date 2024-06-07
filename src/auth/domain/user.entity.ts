import { AuthProvider } from "@prisma/client";
import { Entity, UniqueEntityId } from "#shared/domain";

export { AuthProvider };

export enum GlobalRoles {
  ADMIN = "admin",
}

export enum OrgRoles {
  OWNER = "owner",
  MANAGER = "manager",
  MEMBER = "member",
  GUEST = "guest",
}

export type UserProps = {
  id?: UniqueEntityId;
  name: string;
  email: string;
  provider?: AuthProvider;
  external_id?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProps> {
  private _name: string;
  private _email: string;
  private _password?: string;
  private _provider?: AuthProvider;
  private _external_id?: string;
  constructor(props: UserProps) {
    super(props);
    this._name = props.name;
    this._email = props.email;
    this._provider = props.provider;
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

  get provider(): AuthProvider | undefined {
    return this._provider;
  }

  get password(): string | undefined {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }
}
