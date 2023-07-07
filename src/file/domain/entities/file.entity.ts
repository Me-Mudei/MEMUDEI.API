import { Entity, EntityValidationError, UniqueEntityId } from '#shared/domain';
import FileValidatorFactory from '../validators/file.validator';

export type FileProps = {
  id?: UniqueEntityId;
  filename: string;
  type: string;
  subtype: string;
  url: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class File extends Entity<FileProps> {
  private _filename: string;
  private _type: string;
  private _subtype: string;
  private _url: string;
  private _description?: string;

  constructor(props: FileProps) {
    File.validate(props);
    super(props);
    this._filename = props.filename;
    this._type = props.type;
    this._subtype = props.subtype;
    this._url = props.url;
    this._description = props.description;
  }

  static validate(props: FileProps) {
    const validator = FileValidatorFactory.create();
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

  public get description(): string {
    return this._description;
  }

  public set description(_description: string) {
    this._description = _description;
  }
}
