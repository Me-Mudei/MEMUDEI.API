import { PropertyFilter } from "#property/domain";
import { SearchInputDto, PaginationOutputDto } from "#shared/app/";

import {
  CreatePropertyInput,
  UpdatePropertyInput,
  PropertyOutput,
  AddressOutput,
  FileOutput,
  DetailOutput,
} from "../dto";
import {
  CreatePropertyUseCase,
  UpdatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertiesUseCase,
  GetPropertyDetailsUseCase,
  GetPropertyMediaUseCase,
  GetPropertyAddressUseCase,
} from "../use-cases";

export interface PropertyFacadeProps {
  createProperty: CreatePropertyUseCase;
  updateProperty: UpdatePropertyUseCase;
  getProperty: GetPropertyUseCase;
  searchProperties: SearchPropertiesUseCase;
  getPropertyDetails: GetPropertyDetailsUseCase;
  getPropertyMedia: GetPropertyMediaUseCase;
  getPropertyAddress: GetPropertyAddressUseCase;
}

export class PropertyFacade {
  private _createProperty: CreatePropertyUseCase;
  private _updateProperty: UpdatePropertyUseCase;
  private _getProperty: GetPropertyUseCase;
  private _searchProperties: SearchPropertiesUseCase;
  private _getPropertyDetails: GetPropertyDetailsUseCase;
  private _getPropertyMedia: GetPropertyMediaUseCase;
  private _getPropertyAddress: GetPropertyAddressUseCase;

  constructor(readonly props: PropertyFacadeProps) {
    this._createProperty = props.createProperty;
    this._updateProperty = props.updateProperty;
    this._getProperty = props.getProperty;
    this._searchProperties = props.searchProperties;
    this._getPropertyDetails = props.getPropertyDetails;
    this._getPropertyMedia = props.getPropertyMedia;
    this._getPropertyAddress = props.getPropertyAddress;
  }
  async createProperty(input: CreatePropertyInput): Promise<PropertyOutput> {
    return this._createProperty.execute(input);
  }

  async updateProperty(input: UpdatePropertyInput): Promise<PropertyOutput> {
    return this._updateProperty.execute(input);
  }

  async getProperty(input: { id: string }): Promise<PropertyOutput> {
    return this._getProperty.execute(input);
  }

  async searchProperties(
    input: SearchInputDto<PropertyFilter>,
  ): Promise<PaginationOutputDto<PropertyOutput>> {
    return this._searchProperties.execute(input);
  }

  async getPropertyDetails(input: {
    property_id: string;
  }): Promise<DetailOutput[]> {
    return this._getPropertyDetails.execute(input);
  }

  async getPropertyMedia(input: {
    property_id: string;
  }): Promise<FileOutput[]> {
    return this._getPropertyMedia.execute(input);
  }

  async getPropertyAddress(input: {
    property_id: string;
  }): Promise<AddressOutput> {
    return this._getPropertyAddress.execute(input);
  }
}
