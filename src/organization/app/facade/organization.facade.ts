import { CreateOrganizationInput, OrganizationOutput } from "../dto";
import { CreateOrganizationUseCase } from "../use-cases";

export interface OrganizationFacadeProps {
  createUseCase: CreateOrganizationUseCase;
}

export class OrganizationFacade {
  private _createUseCase: CreateOrganizationUseCase;

  constructor(readonly props: OrganizationFacadeProps) {
    this._createUseCase = props.createUseCase;
  }

  async createOrganization(
    input: CreateOrganizationInput,
  ): Promise<OrganizationOutput> {
    return await this._createUseCase.execute(input);
  }
}
