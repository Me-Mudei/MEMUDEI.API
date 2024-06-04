import { PropertyFacade } from '#property/app';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchPropertiesInput } from './dto/search-properties.input';
import { PaginatePropertiesOutput } from './dto/paginate-properties.output';

@Resolver(() => PaginatePropertiesOutput)
export class SearchPropertiesResolver {
  constructor(private readonly propertyFacade: PropertyFacade) {}

  @Query(() => PaginatePropertiesOutput)
  searchProperties(@Args('input') input: SearchPropertiesInput) {
    return this.propertyFacade.searchProperties(input);
  }
}
