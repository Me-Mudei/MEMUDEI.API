import { ReadStream } from 'fs';

export type FileInput = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => ReadStream;
};

export type FileOutput = {
  filename: string;
  mimetype: string;
  encoding: string;
  url: string;
};

export interface Driver {
  upload(file: FileInput, folder: string): Promise<FileOutput>;
  uploadMany(files: FileInput[], folder: string): Promise<FileOutput[]>;
  getUrl(id: string, folder?: string): Promise<string>;
  delete(id: string, folder?: string): Promise<void>;
}
