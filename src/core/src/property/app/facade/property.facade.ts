import { PropertyOutput } from '../dto';
import { CreatePropertyUseCase } from '../use-cases';

export interface PropertyFacadeProps {
  createUseCase: CreatePropertyUseCase;
}

export type CreatePropertyFacadeInput = {
  name: string;
  email: string;
  role_name: string;
};

export type PropertyFacadeOutput = {
  id: string;
  name: string;
  email: string;
  role_name: string;
  created_at: Date;
  updated_at: Date;
};

export class PropertyFacade {
  private _createUseCase: CreatePropertyUseCase;

  constructor(readonly props: PropertyFacadeProps) {
    this._createUseCase = props.createUseCase;
  }
  async createProperty(
    input: CreatePropertyFacadeInput,
  ): Promise<PropertyFacadeOutput> {
    return this._createUseCase.execute(input);
  }
}
