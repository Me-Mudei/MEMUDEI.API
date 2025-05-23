import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import PhotoValidatorFactory from "../validators/photo.validator";

export type PhotoProps = {
  id?: UniqueEntityId;
  filename: string;
  type: string;
  subtype: string;
  url: string;
  position: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Photo extends Entity<PhotoProps> {
  private _filename: string;
  private _type: string;
  private _subtype: string;
  private _url: string;
  private _position: number;
  private _description?: string;

  constructor(props: PhotoProps) {
    Photo.validate(props);
    super(props);
    this._filename = props.filename;
    this._type = props.type;
    this._subtype = props.subtype;
    this._url = props.url;
    this._position = props.position;
    this._description = props.description;
  }

  static validate(props: PhotoProps) {
    const validator = PhotoValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get filename(): string {
    return this._filename;
  }

  public set filename(_filename: string) {
    this._filename = _filename;
  }

  public get type(): string {
    return this._type;
  }

  public set type(_type: string) {
    this._type = _type;
  }

  public get subtype(): string {
    return this._subtype;
  }

  public set subtype(_subtype: string) {
    this._subtype = _subtype;
  }

  public get url(): string {
    return this._url;
  }

  public set url(_url: string) {
    this._url = _url;
  }

  public get position(): number {
    return this._position;
  }

  public set position(_position: number) {
    this._position = _position;
  }

  public get description(): string {
    return this._description;
  }

  public set description(_description: string) {
    this._description = _description;
  }
}
