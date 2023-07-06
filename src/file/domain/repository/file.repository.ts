import { File } from '../entities';

export interface FileRepository {
  insert(files: File[]): Promise<void>;
  findById: (id: string) => Promise<File>;
  findByReferenceId: (reference_id: string) => Promise<File[]>;
  update: (file: File) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
