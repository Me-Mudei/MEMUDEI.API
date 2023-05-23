import { PropertyFilter, PropertyStatus } from '#property/domain';
import { SearchInputDto, PaginationOutputDto } from '#shared/app/';
import {
  CreatePropertyInput,
  UpdatePropertyInput,
  CreatePropertyOutput,
  UpdatePropertyOutput,
  PropertyOutput,
} from '../dto';
import { PropertyCreatedSendConfirmationHandler } from '../handlers';
import {
  CreatePropertyUseCase,
  UpdatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertyUseCase,
} from '../use-cases';

export interface PropertyFacadeProps {
  createProperty: CreatePropertyUseCase;
  updateProperty: UpdatePropertyUseCase;
  getProperty: GetPropertyUseCase;
  searchProperty: SearchPropertyUseCase;
}

export class PropertyFacade {
  private _createProperty: CreatePropertyUseCase;
  private _updateProperty: UpdatePropertyUseCase;
  private _getProperty: GetPropertyUseCase;
  private _searchProperty: SearchPropertyUseCase;

  constructor(readonly props: PropertyFacadeProps) {
    this._createProperty = props.createProperty;
    this._updateProperty = props.updateProperty;
    this._getProperty = props.getProperty;
    this._searchProperty = props.searchProperty;
  }
  async createProperty(
    input: CreatePropertyInput,
  ): Promise<CreatePropertyOutput> {
    this._createProperty.broker.register(
      new PropertyCreatedSendConfirmationHandler(),
    );
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

  async searchProperty(
    input: SearchInputDto<PropertyFilter>,
  ): Promise<PaginationOutputDto<PropertyOutput>> {
    return this._searchProperty.execute(input);
  }
}
