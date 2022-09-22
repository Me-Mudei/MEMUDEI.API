import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export interface DefaultProps {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
}

export abstract class Entity<Props extends DefaultProps = any> {
  private _id: UniqueEntityId;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(public readonly props: Props) {
    this._id = props.id || new UniqueEntityId();
    this._created_at = props.created_at || new Date();
    this._updated_at = props.updated_at || new Date();
  }

  get id() {
    return this._id.value;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }

  set updated_at(updated_at: Date) {
    this._updated_at = updated_at;
  }

  toJSON(): Required<Props> {
    return { ...this.props } as Required<Props>;
  }
}

export default Entity;
