/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  rmSync,
} from 'fs';
import { join } from 'path';
import { Readable } from 'stream';

import { BucketService, ProcessFileInput, UploadInput } from './bucket.service';

@Injectable()
export class MemoryAdapter extends BucketService {
  constructor() {
    super();
  }
  public async uploadFile(
    externalId: string,
    input: UploadInput,
  ): Promise<void> {
    const path = join(process.cwd(), `/tmp/${externalId}`);
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
    return new Promise((resolve, reject) => {
      input
        .stream()
        .pipe(createWriteStream(`${path}/${input.filename}`))
        .on('finish', () => {
          resolve();
        })
        .on('error', (error: unknown) => {
          reject(error);
        });
    });
  }

  public async uploadFiles(
    externalIds: string[],
    input: UploadInput[],
  ): Promise<void> {
    await Promise.all(
      input.map((file, index) => this.uploadFile(externalIds[index], file)),
    );
  }

  public async getFile(path: string): Promise<Readable> {
    return createReadStream(`${process.cwd()}/tmp/${path}`);
  }

  public async deleteFile(path: string): Promise<void> {
    rmSync(`${process.cwd()}/tmp/${path}`, { recursive: true });
  }

  public async processFiles(files: ProcessFileInput[]): Promise<void> {
    // TODO
  }
}
