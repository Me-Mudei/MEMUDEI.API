import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import PhotoValidatorFactory from "../validators/photo.validator";

export type PhotoProps = {
  id?: UniqueEntityId;
  file: string;
  name: string;
  type: string;
  subtype: string;
  url: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Photo extends Entity<PhotoProps> {
  private _file: string;
  private _name: string;
  private _type: string;
  private _subtype: string;
  private _url: string;
  private _description?: string;

  constructor(props: PhotoProps) {
    Photo.validate(props);
    super(props);
    this._file = props.file;
    this._name = props.name;
    this._type = props.type;
    this._subtype = props.subtype;
    this._url = props.url;
    this._description = props.description;
  }

  static validate(props: PhotoProps) {
    const validator = PhotoValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public get file(): string {
    return this._file;
  }

  public set file(_file: string) {
    this._file = _file;
  }

  public get name(): string {
    return this._name;
  }

  public set name(_name: string) {
    this._name = _name;
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

  public get description(): string {
    return this._description;
  }

  public set description(_description: string) {
    this._description = _description;
  }
}
