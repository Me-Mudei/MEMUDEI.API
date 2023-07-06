import { NotFoundError, UniqueEntityId } from '#shared/domain';
import { File } from '../../domain/entities';
import { FileRepository } from '../../domain/repository';

export class FileInMemoryRepository implements FileRepository {
  items: File[] = [];

  async insert(files: File[]): Promise<void> {
    this.items.push(...files);
  }

  async findById(id: string | UniqueEntityId): Promise<File> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findByReferenceId(reference_id: string): Promise<File[]> {
    return this.items.filter((i) => i.reference_id === reference_id);
  }

  async update(entity: File): Promise<void> {
    await this._get(entity.id);
    const indexFound = this.items.findIndex((i) => i.id === entity.id);
    this.items[indexFound] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    const indexFound = this.items.findIndex((i) => i.id === _id);
    this.items.splice(indexFound, 1);
  }

  protected async _get(id: string): Promise<File> {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }
    return item;
  }
}

export default FileInMemoryRepository;
