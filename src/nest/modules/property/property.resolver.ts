import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyFacade } from '#property/app';
import { PropertyOutput } from './dto/property.output';
import { GetPropertyInput } from './dto/get-property.input';
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
  constructor(private readonly propertyFacada: PropertyFacade) {}

  @Query(() => PropertyOutput)
  getProperty(@Args('input') input: GetPropertyInput) {
    return this.propertyFacada.getProperty({ id: input.id });
  }

  @Mutation(() => Boolean)
  async createProperty(@Args('input') input: CreatePropertyInput) {
    await this.propertyFacada.createProperty(
      CreatePropertyInputMapper.toInput(input, 'user_id'),
    );
    return true;
  }

  @Mutation(() => Boolean)
  async updateProperty(@Args('input') input: UpdatePropertyInput) {
    await this.propertyFacada.updateProperty(
      UpdatePropertyInputMapper.toInput(input),
    );
    return true;
  }
}
