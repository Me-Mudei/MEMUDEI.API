import { CreateMerchantInput, GetMerchantInput, UpdateMerchantInput } from "../dto";
import { CreateMerchantUseCase, GetMerchantUseCase, UpdateMerchantUseCase } from "../use-cases";

export interface MerchantFacadeProps {
  createUseCase: CreateMerchantUseCase;
  updateUseCase: UpdateMerchantUseCase;
  getUseCase: GetMerchantUseCase;
}

export class MerchantFacade {
  private _createUseCase: CreateMerchantUseCase;
  private _updateUseCase: UpdateMerchantUseCase;
  private _getUseCase: GetMerchantUseCase;

  constructor(readonly props: MerchantFacadeProps) {
    this._createUseCase = props.createUseCase;
    this._updateUseCase = props.updateUseCase;
    this._getUseCase = props.getUseCase;
  }

  async createMerchant(input: CreateMerchantInput) {
    return await this._createUseCase.execute(input);
  }

  async getMerchant(input: GetMerchantInput) {
    return await this._getUseCase.execute(input);
  }

  async updateMerchant(input: UpdateMerchantInput) {
    return await this._updateUseCase.execute(input);
  }
}
