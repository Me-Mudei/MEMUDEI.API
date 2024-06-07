import { PropertyFilter } from "#property/domain";
import { SearchInputDto, PaginationOutputDto } from "#shared/app/";

import {
  CreatePropertyInput,
  UpdatePropertyInput,
  CreatePropertyOutput,
  UpdatePropertyOutput,
  PropertyOutput,
} from "../dto";
import {
  CreatePropertyUseCase,
  UpdatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertiesUseCase,
} from "../use-cases";

export interface PropertyFacadeProps {
  createProperty: CreatePropertyUseCase;
  updateProperty: UpdatePropertyUseCase;
  getProperty: GetPropertyUseCase;
  searchProperties: SearchPropertiesUseCase;
}

export class PropertyFacade {
  private _createProperty: CreatePropertyUseCase;
  private _updateProperty: UpdatePropertyUseCase;
  private _getProperty: GetPropertyUseCase;
  private _searchProperties: SearchPropertiesUseCase;

  constructor(readonly props: PropertyFacadeProps) {
    this._createProperty = props.createProperty;
    this._updateProperty = props.updateProperty;
    this._getProperty = props.getProperty;
    this._searchProperties = props.searchProperties;
  }
  async createProperty(
    input: CreatePropertyInput,
  ): Promise<CreatePropertyOutput> {
    return this._createProperty.execute(input);
  }

  async updateProperty(
    input: UpdatePropertyInput,
  ): Promise<UpdatePropertyOutput> {
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
}
