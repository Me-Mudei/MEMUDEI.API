import { Entity, UniqueEntityId } from "#shared/domain";

import { File } from "./file.entity";

export type MediaProps = {
  id?: UniqueEntityId;
  file: File;
  position: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Media extends Entity<MediaProps> {
  private _file: File;
  private _position: number;
  private _description?: string;

  constructor(props: MediaProps) {
    super(props);
    this._file = props.file;
    this._position = props.position;
    this._description = props.description;
  }

  public get file(): File {
    return this._file;
  }

  public get position(): number {
    return this._position;
  }

  public set position(_position: number) {
    this._position = _position;
  }

  public get description(): string | undefined {
    return this._description;
  }

  public set description(_description: string) {
    this._description = _description;
  }
}
