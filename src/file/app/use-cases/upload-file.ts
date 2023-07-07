import { File, FileRepository } from '../../domain';
import { Driver } from '../../domain/driver';

import { UploadFileInput, UploadFileOutput } from '../dto';
import { UseCase } from '#shared/app';
import { LoggerInterface, WinstonLogger } from '#shared/infra';

export class UploadFileUseCase
  implements UseCase<UploadFileInput, UploadFileOutput>
{
  private logger: LoggerInterface;
  constructor(
    readonly fileRepository: FileRepository,
    readonly driver: Driver,
  ) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: UploadFileInput): Promise<UploadFileOutput> {
    this.logger.info({ message: 'Start File Use Case' });
    const filesUploaded = await this.driver.uploadMany(
      input.files,
      `${input.reference_type}`,
    );
    this.logger.info({ message: 'Files uploaded' });
    const files = filesUploaded.map((file) => {
      return new File({
        filename: file.filename,
        type: file.mimetype.split('/')[0],
        subtype: file.mimetype.split('/')[1],
        url: file.url,
      });
    });

    await this.fileRepository.insert(files);
    return files.map((file) => {
      return {
        id: file.id.toString(),
        url: file.url,
        filename: file.filename,
        type: file.type,
        subtype: file.subtype,
        description: file.description,
      };
    });
  }
}
