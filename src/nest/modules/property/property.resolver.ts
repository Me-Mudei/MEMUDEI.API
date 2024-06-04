import { PropertyOutput } from './dto/property.output';
import { PropertyFacade } from '#property/app';
import { GetPropertyInput } from './dto/get-property.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreatePropertyInput,
  CreatePropertyInputMapper,
} from './dto/create-property.input';

import {
  UpdatePropertyInput,
  UpdatePropertyInputMapper,
} from './dto/update-property.input';

@Resolver(() => PropertyOutput)
export class PropertyResolver {
  constructor(private readonly propertyFacade: PropertyFacade) {}

  @Query(() => PropertyOutput)
  getProperty(@Args('input') input: GetPropertyInput) {
    return this.propertyFacade.getProperty({ id: input.id });
  }

  @Mutation(() => Boolean)
  async createProperty(@Args('input') input: CreatePropertyInput) {
    await this.propertyFacade.createProperty(
      CreatePropertyInputMapper.toInput(input, 'user_id'),
    );
    return true;
  }

  @Mutation(() => Boolean)
  async updateProperty(@Args('input') input: UpdatePropertyInput) {
    await this.propertyFacade.updateProperty(
      UpdatePropertyInputMapper.toInput(input),
    );
    return true;
  }
}
