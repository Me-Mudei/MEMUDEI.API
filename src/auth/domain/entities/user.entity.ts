import { Entity, UniqueEntityId } from '#shared/domain';

export type UserProps = {
  id?: UniqueEntityId;
  external_id: string;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProps> {
  private _external_id: string;

  constructor(props: UserProps) {
    super(props);
    this._external_id = props.external_id;
  }

  public get external_id(): string {
    return this._external_id;
  }
}
