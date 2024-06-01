import { FileOptions } from '../../modules/file/dto/file.input';
import { Readable } from 'stream';

export interface UploadInput {
  mimetype: string;
  filename: string;
  stream: () => Readable;
}
export type UploadOutput = {
  url: string;
  filename: string;
};

export interface ProcessFileInput {
  filename: string;
  external_id: string;
  position?: number;
}

export interface ProcessFileOutput extends ProcessFileInput {
  url: string;
}

export abstract class BucketService {
  public abstract getFile(
    path: string,
    options?: FileOptions,
  ): Promise<Readable>;
  public abstract deleteFile(path: string): Promise<void>;
  public abstract processFiles(files: ProcessFileInput[]): Promise<void>;
}
