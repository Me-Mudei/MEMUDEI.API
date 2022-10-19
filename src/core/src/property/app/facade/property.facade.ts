import { CreatePropertyInput, CreatePropertyOutput } from '../dto';
import { CreatePropertyUseCase } from '../use-cases';

export interface PropertyFacadeProps {
  createUseCase: CreatePropertyUseCase;
}

export class PropertyFacade {
  private _createUseCase: CreatePropertyUseCase;

  constructor(readonly props: PropertyFacadeProps) {
    this._createUseCase = props.createUseCase;
  }
  async createProperty(
    input: CreatePropertyInput,
  ): Promise<CreatePropertyOutput> {
    return this._createUseCase.execute(input);
  }
}
