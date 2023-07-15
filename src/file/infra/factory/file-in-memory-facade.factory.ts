import { FileFacade } from "../../app/facade";
import { UploadFileUseCase } from "../../app/use-cases";
import { InMemoryDriver } from "../driver";
import { FileInMemoryRepository } from "../repository";

export class FileInMemoryFacadeFactory {
  static create() {
    const userRepository = new FileInMemoryRepository();
    const driver = new InMemoryDriver();

    const uploadFileUseCase = new UploadFileUseCase(userRepository, driver);

    return new FileFacade({
      uploadUseCase: uploadFileUseCase
    });
  }
}
