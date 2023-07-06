import { File, FileRepository } from '../../domain';
import { Driver } from '../../domain/driver';

import { UploadFileInput, FileOutput } from '../dto';
import { UseCase } from '#shared/app';
import { LoggerInterface, WinstonLogger } from '#shared/infra';

export class UploadFileUseCase implements UseCase<UploadFileInput, FileOutput> {
  private logger: LoggerInterface;
  constructor(
    readonly fileRepository: FileRepository,
    readonly driver: Driver,
  ) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: UploadFileInput): Promise<FileOutput> {
    this.logger.info({ message: 'Start File Use Case' });
    const filesUploaded = await this.driver.uploadMany(
      input.files,
      `${input.reference_id}`,
    );
    this.logger.info({ message: 'Files uploaded' });
    const files = filesUploaded.map((file) => {
      return new File({
        reference_id: input.reference_id,
        file: file.filename,
        name: file.filename,
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
        file: file.file,
        name: file.name,
        type: file.type,
        subtype: file.subtype,
        description: file.description,
      };
    });
  }
}
