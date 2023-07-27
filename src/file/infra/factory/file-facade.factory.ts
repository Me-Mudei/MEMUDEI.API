import { Connection } from "#shared/infra";

import { FileFacade } from "../../app/facade";
import { UploadFileUseCase } from "../../app/use-cases";
import { AwsS3Driver } from "../driver";
import { FilePrismaRepository } from "../repository";

export class FileFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const driver = new AwsS3Driver();
    const userRepository = new FilePrismaRepository(prisma);

    const uploadFileUseCase = new UploadFileUseCase(userRepository, driver);

    return new FileFacade({
      uploadUseCase: uploadFileUseCase
    });
  }
}
