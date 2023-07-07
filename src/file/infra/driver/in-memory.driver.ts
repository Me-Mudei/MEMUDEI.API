import { createWriteStream, existsSync, mkdirSync, rmdir } from 'fs';
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
    const resultFile = file.createReadStream();
    if (resultFile instanceof Buffer) {
      return {
        filename: file.filename,
        mimetype: file.mimetype,
        url: `${path}/${file.filename}`,
      };
    }
    resultFile.pipe(createWriteStream(`${path}/${file.filename}`));
    return {
      filename: file.filename,
      mimetype: file.mimetype,
      url: `${path}/${file.filename}`,
    };
  }

  async uploadMany(files: FileInput[], folder: string): Promise<FileOutput[]> {
    return Promise.all(files.map((file) => this.upload(file, folder)));
  }

  async getUrl(id: string, folder?: string): Promise<string> {
    return id;
  }

  async delete(filename: string, id: string): Promise<void> {
    const path = `${__dirname}/tmp/${id}`;
    rmdir(`${path}`, { recursive: true }, (err) => {
      if (err) throw err;
    });
    this.files = this.files.filter((file) => file.filename !== filename);
  }
}
