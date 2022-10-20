import { PaginationOutputDto } from '#shared/app/dto/pagination-output.dto';
import { SearchInputDto } from '#shared/app/dto/search-input.dto';
import { CreatePropertyInput, PropertyOutput } from '../dto';
import { PropertyCreatedSendConfirmationHandler } from '../handlers';
import {
  CreatePropertyUseCase,
  GetPropertyUseCase,
  SearchPropertyUseCase,
} from '../use-cases';

export interface PropertyFacadeProps {
  createUseCase: CreatePropertyUseCase;
  getUseCase: GetPropertyUseCase;
  searchUseCase: SearchPropertyUseCase;
}

export class PropertyFacade {
  private _createUseCase: CreatePropertyUseCase;
  private _getUseCase: GetPropertyUseCase;
  private _searchUseCase: SearchPropertyUseCase;

  constructor(readonly props: PropertyFacadeProps) {
    this._createUseCase = props.createUseCase;
    this._getUseCase = props.getUseCase;
    this._searchUseCase = props.searchUseCase;
  }
  async createProperty(input: CreatePropertyInput): Promise<PropertyOutput> {
    this._createUseCase.broker.register(
      new PropertyCreatedSendConfirmationHandler(),
    );
    return this._createUseCase.execute(input);
  }

  async getProperty(input: { id: string }): Promise<PropertyOutput> {
    return this._getUseCase.execute(input);
  }

  async searchProperty(
    input: SearchInputDto,
  ): Promise<PaginationOutputDto<PropertyOutput>> {
    return this._searchUseCase.execute(input);
  }
}
