import { DetailOutput } from "../dto";
import { GetPropertyDetailsUseCase } from "../use-cases";

export interface PropertyDetailFacadeProps {
  getPropertyDetails: GetPropertyDetailsUseCase;
}

export class PropertyDetailFacade {
  private _getPropertyDetails: GetPropertyDetailsUseCase;

  constructor(readonly props: PropertyDetailFacadeProps) {
    this._getPropertyDetails = props.getPropertyDetails;
  }

  async getPropertyDetails(input: {
    property_id: string;
  }): Promise<DetailOutput[]> {
    return this._getPropertyDetails.execute(input);
  }
}
