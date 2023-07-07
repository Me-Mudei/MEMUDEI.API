import { createReadStream } from 'fs';
import { Driver } from '../../domain';
import { FileInMemoryRepository, InMemoryDriver } from '../../infra';
import { UploadFileUseCase } from '../use-cases';
import { FileFacade } from './file.facade';

describe('FileFacade Unit tests', () => {
  let useCase: UploadFileUseCase;
  let driver: Driver;
  let repository: FileInMemoryRepository;
  let facade: FileFacade;

  beforeEach(() => {
    repository = new FileInMemoryRepository();
    driver = new InMemoryDriver();
    useCase = new UploadFileUseCase(repository, driver);
    facade = new FileFacade({
      uploadUseCase: useCase,
    });
  });
  it('should create a user facade', async () => {
    const spyFacadeCreate = jest.spyOn(facade, 'uploadFile');
    const spyUseCaseExecute = jest.spyOn(useCase, 'execute');
    await facade.uploadFile({
      reference_type: 'property',
      files: [
        {
          filename: 'facade-upload-test.txt',
          mimetype: 'text/plain',
          createReadStream: () =>
            createReadStream(`${__dirname}/facade-upload-test.txt`),
        },
      ],
    });
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
