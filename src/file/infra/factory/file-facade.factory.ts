import { FileFacade } from '../../app/facade';
import { Connection } from '#shared/infra';
import { UploadFileUseCase } from '../../app/use-cases';
import { FilePrismaRepository } from '../repository';
import { AwsS3Driver } from '../driver';

export class FileFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const driver = new AwsS3Driver();
    const userRepository = new FilePrismaRepository(prisma);

    const uploadFileUseCase = new UploadFileUseCase(userRepository, driver);

    return new FileFacade({
      uploadUseCase: uploadFileUseCase,
    });
  }
}
