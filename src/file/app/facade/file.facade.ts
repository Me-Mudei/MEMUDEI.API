import { UploadFileInput, UploadFileOutput } from "../dto";
import { UploadFileUseCase } from "../use-cases";

export interface FileFacadeProps {
  uploadUseCase: UploadFileUseCase;
}

export class FileFacade {
  private _uploadUseCase: UploadFileUseCase;

  constructor(readonly props: FileFacadeProps) {
    this._uploadUseCase = props.uploadUseCase;
  }
  async uploadFile(input: UploadFileInput): Promise<UploadFileOutput> {
    return this._uploadUseCase.execute(input);
  }
}
