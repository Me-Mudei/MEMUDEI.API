import { S3Client } from '@aws-sdk/client-s3';
import {
  createPresignedPost,
  PresignedPostOptions,
} from '@aws-sdk/s3-presigned-post';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import {
  BucketService,
  ProcessFileInput,
  ProcessFileOutput,
} from '../../libs/bucket/bucket.service';
import { EnvironmentVariables } from '../../libs/config/env.type';
import { ErrorCode } from '../../libs/helpers/error-code.enum';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { Readable } from 'stream';

import { GetFileInput } from './dto/file.input';
import { FileOutput } from './dto/file.output';
import { PreSignedUrlOutput } from './dto/pre-signed-url.output';
import { FileError } from './error/error.entity';
import { FileErrorType } from './error/error.enum';

@Injectable()
export class FileService {
  constructor(
    private config: ConfigService<EnvironmentVariables>,
    private prisma: PrismaService,
    private bucketService: BucketService,
  ) {}

  async processFiles(files: ProcessFileInput[]): Promise<ProcessFileOutput[]> {
    await this.bucketService.processFiles(files);

    return files.map((file) => ({
      ...file,
      url: `${this.config.get('MEMUDEI_MEDIA_URL')}/images/${file.external_id}/${
        file.filename
      }`,
    }));
  }

  async getPreSignedUrl(
    filename: string,
    contentType: string,
  ): Promise<PreSignedUrlOutput> {
    const external_id = nanoid();

    const s3 = new S3Client({
      credentials: {
        accessKeyId: this.config.getOrThrow('STORAGE_ACCESS_KEY_ID'),
        secretAccessKey: this.config.getOrThrow('STORAGE_SECRET_ACCESS_KEY'),
      },
      region: this.config.getOrThrow('STORAGE_REGION'),
    });

    const key = `${external_id}/${filename}`;

    const params: PresignedPostOptions = {
      Bucket: 'riza-bucket-dev',
      Key: key,
      Expires: 60 * 15, // 15 minutes
      Fields: {
        key: key,
        acl: 'private',
        'Content-Type': contentType ?? 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
      Conditions: [['starts-with', '$key', `${external_id}/`]],
    };

    const result = await createPresignedPost(s3, params);

    return {
      external_id,
      url: result.url,
      fields: result.fields,
    };
  }

  async findOne(id?: string | null): Promise<FileOutput | null> {
    if (!id) {
      return null;
    }

    const file = await this.prisma.file.findFirst({
      where: { OR: [{ external_id: id }, { id }] },
    });

    if (!file) {
      return null;
    }
    return {
      ...file,
      url: `${this.config.get('MEMUDEI_URL')}/storage/${file.external_id}`,
    };
  }

  async getFile(input: GetFileInput): Promise<Readable> {
    const file = await this.prisma.file.findFirst({
      where: { external_id: input.id },
    });

    if (!file) {
      throw new FileError(
        'File not found',
        FileErrorType.FILE_NOT_FOUND,
        ErrorCode.BAD_REQUEST,
      );
    }

    const readable = await this.bucketService.getFile(
      `${input.id}/${file.filename}`,
      input.options,
    );

    return readable;
  }

  async deleteFile(id: string): Promise<void> {
    const file = await this.prisma.file.findFirst({
      where: { external_id: id },
    });

    if (!file) {
      throw new FileError(
        'File not found',
        FileErrorType.FILE_NOT_FOUND,
        ErrorCode.BAD_REQUEST,
      );
    }

    await this.bucketService.deleteFile(`${id}/${file.filename}`);
  }
}
