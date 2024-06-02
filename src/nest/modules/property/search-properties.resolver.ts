import { Args, Query, Resolver } from '@nestjs/graphql';
import { PropertyFacade } from '../../../property/app/facade/property.facade';
import { PropertiesPaginationOutput } from './dto/paginate-property.output';
import { PropertySearchInput } from './dto/search-properties.input';

@Resolver(() => PropertiesPaginationOutput)
export class SearchPropertiesResolver {
  constructor(private readonly propertyFacada: PropertyFacade) {}

  @Query(() => PropertiesPaginationOutput)
  searchProperties(@Args('input') input: PropertySearchInput) {
    return this.propertyFacada.searchProperty(input);
  }
}
