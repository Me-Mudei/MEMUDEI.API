import { FileOutput } from "../dto";
import { GetPropertyMediaUseCase } from "../use-cases";

export interface PropertyMediaFacadeProps {
  getPropertyMedia: GetPropertyMediaUseCase;
}

export class PropertyMediaFacade {
  private _getPropertyMedia: GetPropertyMediaUseCase;

  constructor(readonly props: PropertyMediaFacadeProps) {
    this._getPropertyMedia = props.getPropertyMedia;
  }

  async getPropertyMedia(input: {
    property_id: string;
  }): Promise<FileOutput[]> {
    return this._getPropertyMedia.execute(input);
  }
}
