import { Controller, Get, Param, Query, StreamableFile } from '@nestjs/common';

import { FileOptions } from './dto/file.input';
import { PreSignedUrlInput } from './dto/pre-signed-url.input';
import { PreSignedUrlOutput } from './dto/pre-signed-url.output';
import { FileService } from './file.service';

@Controller('storage')
export class FileController {
  constructor(private service: FileService) {}

  @Get('/pre-signed-url')
  async getPreSignedUrl(
    @Query() { filename, content_type }: PreSignedUrlInput,
  ): Promise<PreSignedUrlOutput> {
    return this.service.getPreSignedUrl(filename, content_type);
  }

  @Get(':id')
  async getFile(
    @Param('id') id: string,
    @Query() options: FileOptions,
  ): Promise<StreamableFile> {
    const file = await this.service.getFile({ id, options });
    return new StreamableFile(file, {
      type: `image/${options.format ?? 'webp'}`,
      disposition: 'inline',
    });
  }
}
