import { Photo } from '../photo.entity';
import { Chance } from 'chance';
import { UniqueEntityId } from '#shared/domain';

type PropOrFactory<T> = T | ((index: number) => T);

export class PhotoFakeBuilder<TBuild = any> {
  private _id = undefined;
  private _created_at = undefined;
  private _updated_at = undefined;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _description: PropOrFactory<string | null> = (_index) =>
    this.chance.sentence({ words: 10 });
  private _file: PropOrFactory<string> = (_index) => this.chance.word();
  private _type: PropOrFactory<string> = (_index) => this.chance.word();
  private _subtype: PropOrFactory<string> = (_index) => this.chance.word();
  private _url: PropOrFactory<string> = (_index) =>
    this.chance.url({ extensions: ['jpg', 'png'] });

  private countObjs: number;

  static aPhoto() {
    return new PhotoFakeBuilder<Photo>();
  }

  static thePhotos(countObjs: number) {
    return new PhotoFakeBuilder<Photo[]>(countObjs);
  }

  private chance: Chance.Chance;

  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withId(valueOrFactory: PropOrFactory<UniqueEntityId>) {
    this._id = valueOrFactory;
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  withUpdatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._updated_at = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withDescription(valueOrFactory: PropOrFactory<string | null>) {
    this._description = valueOrFactory;
    return this;
  }

  withFile(valueOrFactory: PropOrFactory<string>) {
    this._file = valueOrFactory;
    return this;
  }

  withType(valueOrFactory: PropOrFactory<string>) {
    this._type = valueOrFactory;
    return this;
  }

  withSubtype(valueOrFactory: PropOrFactory<string>) {
    this._subtype = valueOrFactory;
    return this;
  }

  withUrl(valueOrFactory: PropOrFactory<string>) {
    this._url = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Photo({
          ...(this._id && {
            id: this.callFactory(this._id, index),
          }),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index),
          }),
          ...(this._updated_at && {
            updated_at: this.callFactory(this._updated_at, index),
          }),
          name: this.callFactory(this._name, index),
          description: this.callFactory(this._description, index),
          file: this.callFactory(this._file, index),
          type: this.callFactory(this._type, index),
          subtype: this.callFactory(this._subtype, index),
          url: this.callFactory(this._url, index),
        }),
    );
    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  get id() {
    return this.getValue('id');
  }

  get name() {
    return this.getValue('name');
  }

  get description() {
    return this.getValue('description');
  }

  get file() {
    return this.getValue('file');
  }

  get type() {
    return this.getValue('type');
  }

  get subtype() {
    return this.getValue('subtype');
  }

  get url() {
    return this.getValue('url');
  }

  get created_at() {
    return this.getValue('created_at');
  }

  get updated_at() {
    return this.getValue('updated_at');
  }

  private getValue(prop) {
    const optional = ['id', 'created_at', 'updated_at'];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(`Photo ${prop} not have a factory, use 'with' methods`);
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
