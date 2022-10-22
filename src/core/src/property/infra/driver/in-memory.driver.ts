import { createWriteStream, existsSync, mkdirSync } from 'fs';
import {
  Driver,
  FileInput,
  FileOutput,
} from '../../domain/driver/driver-contracts';

export class InMemoryDriver implements Driver {
  private files: FileInput[] = [];

  async upload(file: FileInput, folder: string): Promise<FileOutput> {
    const path = `${__dirname}/tmp/${folder}`;
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
    file.createReadStream().pipe(createWriteStream(`${path}/${file.filename}`));
    return {
      filename: file.filename,
      mimetype: file.mimetype,
      encoding: file.encoding,
      url: `${path}/${file.filename}`,
    };
  }

  async uploadMany(files: FileInput[], folder: string): Promise<FileOutput[]> {
    return Promise.all(files.map((file) => this.upload(file, folder)));
  }

  async getUrl(id: string, folder?: string): Promise<string> {
    return id;
  }

  async delete(id: string, folder?: string): Promise<void> {
    this.files = this.files.filter((file) => file.filename !== id);
  }
}
