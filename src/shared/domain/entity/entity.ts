import { UniqueEntityId } from "../value-objects";

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

  toJSON(): Required<
    { id: string; created_at: Date; updated_at: Date } & Omit<Props, "id">
  > {
    const { id, created_at, updated_at, ...args } = this.props;
    Object.keys(args).forEach((key) => {
      if (args[key] instanceof Entity) {
        args[key] = args[key].toJSON();
      }
      if (Array.isArray(args[key])) {
        args[key] = args[key].map((item) => {
          if (item instanceof Entity) {
            return item.toJSON();
          }
          return item;
        });
      }
    });
    return {
      id: this.id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      ...args
    } as unknown as Required<
      { id: string; created_at: Date; updated_at: Date } & Omit<Props, "id">
    >;
  }
}

export default Entity;
