import { PropertyFilter, PropertyStatus } from '#property/domain';
import { SearchInputDto, PaginationOutputDto } from '#shared/app/';
import { CreatePropertyInput, PropertyOutput } from '../dto';
import { PropertyCreatedSendConfirmationHandler } from '../handlers';
import {
  CreatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertyUseCase,
} from '../use-cases';

export interface PropertyFacadeProps {
  createProperty: CreatePropertyUseCase;
  getProperty: GetPropertyUseCase;
  searchProperty: SearchPropertyUseCase;
}

export class PropertyFacade {
  private _createProperty: CreatePropertyUseCase;
  private _getProperty: GetPropertyUseCase;
  private _searchProperty: SearchPropertyUseCase;

  constructor(readonly props: PropertyFacadeProps) {
    this._createProperty = props.createProperty;
    this._getProperty = props.getProperty;
    this._searchProperty = props.searchProperty;
  }
  async createProperty(
    input: Omit<CreatePropertyInput, 'status'> & { status?: string },
  ): Promise<PropertyOutput> {
    this._createProperty.broker.register(
      new PropertyCreatedSendConfirmationHandler(),
    );
    const status = input.status && PropertyStatus[`${input.status}`];
    return this._createProperty.execute({ ...input, status });
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
