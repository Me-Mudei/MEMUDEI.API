import { FileOutput } from "../dto";
import { GetPropertyAddressUseCase } from "../use-cases";

export interface PropertyAddressFacadeProps {
  getPropertyAddress: GetPropertyAddressUseCase;
}

export class PropertyAddressFacade {
  private _getPropertyAddress: GetPropertyAddressUseCase;

  constructor(readonly props: PropertyAddressFacadeProps) {
    this._getPropertyAddress = props.getPropertyAddress;
  }

  async getPropertyAddress(input: {
    property_id: string;
  }): Promise<FileOutput[]> {
    return this._getPropertyAddress.execute(input);
  }
}
