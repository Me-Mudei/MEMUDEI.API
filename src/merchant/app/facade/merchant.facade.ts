import {
  CreateMerchantInput,
  GetMerchantInput,
  UpdateMerchantInput,
  RemoveMerchantInput,
} from "../dto";
import {
  CreateMerchantUseCase,
  GetMerchantUseCase,
  UpdateMerchantUseCase,
  RemoveMerchantUseCase,
} from "../use-cases";

export interface MerchantFacadeProps {
  createUseCase: CreateMerchantUseCase;
  getUseCase: GetMerchantUseCase;
  updateUseCase: UpdateMerchantUseCase;
  removeUseCase: RemoveMerchantUseCase;
}

export class MerchantFacade {
  private _createUseCase: CreateMerchantUseCase;
  private _getUseCase: GetMerchantUseCase;
  private _updateUseCase: UpdateMerchantUseCase;
  private _removeUseCase: RemoveMerchantUseCase;

  constructor(readonly props: MerchantFacadeProps) {
    this._createUseCase = props.createUseCase;
    this._getUseCase = props.getUseCase;
    this._updateUseCase = props.updateUseCase;
    this._removeUseCase = props.removeUseCase;
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

  async removeMerchant(input: RemoveMerchantInput) {
    return await this._removeUseCase.execute(input);
  }
}
