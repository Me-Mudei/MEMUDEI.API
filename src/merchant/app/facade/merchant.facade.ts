import { MerchantFilter } from "#merchant/domain";
import { PaginationOutputDto, SearchInputDto } from "#shared/app";

import { MerchantOutput, GetMyMerchantMemberInput, MemberOutput } from "../dto";
import {
  SearchMerchantsUseCase,
  GetMyMerchantMemberUseCase,
} from "../use-cases";

export interface MerchantFacadeProps {
  searchMerchants: SearchMerchantsUseCase;
  getMyMerchantMember: GetMyMerchantMemberUseCase;
}

export class MerchantFacade {
  private _searchMerchants: SearchMerchantsUseCase;
  private _getMyMerchantMember: GetMyMerchantMemberUseCase;

  constructor(readonly props: MerchantFacadeProps) {
    this._searchMerchants = props.searchMerchants;
    this._getMyMerchantMember = props.getMyMerchantMember;
  }
  async searchMerchants(
    input: SearchInputDto<MerchantFilter>,
  ): Promise<PaginationOutputDto<MerchantOutput>> {
    return this._searchMerchants.execute(input);
  }

  async getMyMerchantMember(
    input: GetMyMerchantMemberInput,
  ): Promise<MemberOutput> {
    return this._getMyMerchantMember.execute(input);
  }
}
