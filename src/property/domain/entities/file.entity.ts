import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import FileValidatorFactory from "../validators/file.validator";

export type FileProps = {
  id?: UniqueEntityId;
  name: string;
  type: string;
  subtype: string;
  url: string;
  created_at?: Date;
  updated_at?: Date;
};

export class File extends Entity<FileProps> {
  private _name: string;
  private _type: string;
  private _subtype: string;
  private _url: string;

  constructor(props: FileProps) {
    File.validate(props);
    super(props);
    this._name = props.name;
    this._type = props.type;
    this._subtype = props.subtype;
    this._url = props.url;
  }

  static validate(props: FileProps) {
    const validator = FileValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
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
}
