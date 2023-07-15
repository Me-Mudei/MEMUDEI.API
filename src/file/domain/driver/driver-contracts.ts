import { ReadStream } from "fs";
import { Readable } from "stream";

export type FileInput = {
  filename: string;
  mimetype: string;
  createReadStream: () => ReadStream | Buffer | Readable;
};

export type FileOutput = {
  filename: string;
  mimetype: string;
  url: string;
};

export interface Driver {
  upload(file: FileInput, folder: string): Promise<FileOutput>;
  uploadMany(files: FileInput[], folder: string): Promise<FileOutput[]>;
  getUrl(id: string, folder?: string): Promise<string>;
  delete(id: string, folder?: string): Promise<void>;
}
