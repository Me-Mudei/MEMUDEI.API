import { Merchant } from "#merchant/domain";
import {
  UseCase,
  SearchInputDto,
  PaginationOutputDto,
  PaginationOutputMapper,
} from "#shared/app";
import { UniqueEntityId } from "#shared/domain";
import {
  LoggerInterface,
  Prisma,
  PrismaClient,
  WinstonLogger,
} from "#shared/infra";

import {
  MerchantFilter,
  MerchantSearchParams,
  MerchantSearchResult,
} from "../../domain/repository";
import { MerchantOutput, MerchantOutputMapper } from "../dto";

export class SearchMerchantsUseCase
  implements
    UseCase<
      SearchInputDto<MerchantFilter>,
      PaginationOutputDto<MerchantOutput>
    >
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(
    input: SearchInputDto<MerchantFilter>,
  ): Promise<PaginationOutputDto<MerchantOutput>> {
    this.logger.info({ message: "Start Search Merchant Use Case" });
    const params = new MerchantSearchParams(input);
    const properties = await this.prisma.merchant.findMany(
      params.toPrismaPagination<Prisma.MerchantFindManyArgs>(
        params.applyFilter,
      ),
    );
    const result = new MerchantSearchResult({
      items: properties.map(
        (merchant) =>
          new Merchant({
            id: new UniqueEntityId(merchant.id),
            company_name: merchant.company_name,
            organization_id: merchant.organization_id,
            created_at: merchant.created_at,
            updated_at: merchant.updated_at,
          }),
      ),
      current_page: params.page,
      per_page: params.per_page,
      total: properties.length,
      filter: params.filter,
      sort: params.sort,
      sort_dir: params.sort_dir,
    });
    const items = result.items.map((merchant) =>
      MerchantOutputMapper.toOutput(merchant),
    );
    this.logger.info({ message: "End Search Merchant Use Case" });
    return PaginationOutputMapper.toOutput(items, result);
  }
}
