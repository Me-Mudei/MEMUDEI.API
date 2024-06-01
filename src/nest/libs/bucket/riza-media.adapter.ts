import { ConfigService } from '@nestjs/config';
import axios, { Axios } from 'axios';
import { Readable } from 'node:stream';
import { format } from 'node:url';
import { FileOptions } from '../../modules/file/dto/file.input';

import { EnvironmentVariables } from '../config/env.type';

import { BucketService, ProcessFileInput } from './bucket.service';
import { BucketError } from './error/error.entity';
import { BucketErrorType } from './error/error.enum';

export class RizaMediaAdapter extends BucketService {
  private axios: Axios;

  constructor(private config: ConfigService<EnvironmentVariables>) {
    super();
    this.axios = new Axios({
      baseURL: this.config.getOrThrow('MEMUDEI_MEDIA_URL'),
      transformRequest: axios.defaults.transformRequest,
      transformResponse: axios.defaults.transformResponse,
    });
  }

  public async getFile(path: string, options?: FileOptions): Promise<Readable> {
    const url = format({
      pathname: `/images/${path}`,
      query: options ? { ...options } : null,
    });

    const { data, status } = await this.axios.get<Readable>(`${url}`, {
      responseType: 'stream',
    });

    if (status !== 200) {
      throw new BucketError(
        'Failed to get file from riza-media',
        BucketErrorType.FILE_NOT_FOUND,
      );
    }

    return data;
  }

  public async deleteFile(path: string): Promise<void> {
    await this.axios.delete(`/images/${path}`);
  }

  public async processFiles(files: ProcessFileInput[]): Promise<void> {
    await this.axios.post('/images', {
      files: files.map((file) => ({
        file_name: file.filename,
        external_id: file.external_id,
      })),
    });
  }
}
