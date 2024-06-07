import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PropertyFacade } from "#property/app";

import { Public } from "../auth/public.decorator";

import {
  CreatePropertyInput,
  CreatePropertyInputMapper,
} from "./dto/create-property.input";
import { GetPropertyInput } from "./dto/get-property.input";
import { PaginatePropertiesOutput } from "./dto/paginate-properties.output";
import { PropertyOutput } from "./dto/property.output";
import { SearchPropertiesInput } from "./dto/search-properties.input";
import {
  UpdatePropertyInput,
  UpdatePropertyInputMapper,
} from "./dto/update-property.input";

@Resolver()
export class PropertyResolver {
  constructor(private readonly propertyFacade: PropertyFacade) {}

  @Query(() => PropertyOutput)
  getProperty(@Args("input") input: GetPropertyInput) {
    return this.propertyFacade.getProperty({ id: input.id });
  }

  @Public()
  @Query(() => PaginatePropertiesOutput)
  searchProperties(@Args("input") input: SearchPropertiesInput) {
    return this.propertyFacade.searchProperties(input);
  }

  @Mutation(() => Boolean)
  async createProperty(@Args("input") input: CreatePropertyInput) {
    await this.propertyFacade.createProperty(
      CreatePropertyInputMapper.toInput(input, "user_id"),
    );
    return true;
  }

  @Mutation(() => Boolean)
  async updateProperty(@Args("input") input: UpdatePropertyInput) {
    await this.propertyFacade.updateProperty(
      UpdatePropertyInputMapper.toInput(input),
    );
    return true;
  }
}
