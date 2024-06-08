import { Property, PropertyStatus, PropertyType } from "#property/domain";
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
  PropertyFilter,
  PropertySearchParams,
  PropertySearchResult,
} from "../../domain/repository";
import { PropertyOutput, PropertyOutputMapper } from "../dto";

export class SearchPropertiesUseCase
  implements
    UseCase<
      SearchInputDto<PropertyFilter>,
      PaginationOutputDto<PropertyOutput>
    >
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(
    input: SearchInputDto<PropertyFilter>,
  ): Promise<PaginationOutputDto<PropertyOutput>> {
    this.logger.info({ message: "Start Search Property Use Case" });
    const params = new PropertySearchParams(input);
    const properties = await this.prisma.property.findMany(
      params.toPrismaPagination<Prisma.PropertyFindManyArgs>(),
    );
    const result = new PropertySearchResult({
      items: properties.map(
        (property) =>
          new Property({
            id: new UniqueEntityId(property.id),
            title: property.title,
            description: property.description,
            status: PropertyStatus[property.status],
            property_type: PropertyType[property.property_type],
            created_at: property.created_at,
            updated_at: property.updated_at,
          }),
      ),
      current_page: input.page,
      per_page: input.per_page,
      total: properties.length,
      filter: input.filter,
      sort: input.sort,
      sort_dir: input.sort_dir,
    });
    const items = result.items.map((property) =>
      PropertyOutputMapper.toOutput(property),
    );
    this.logger.info({ message: "End Search Property Use Case" });
    return PaginationOutputMapper.toOutput(items, result);
  }
}
