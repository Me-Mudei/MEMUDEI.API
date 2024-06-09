import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { OrgRole } from "#organization/domain";
import { PropertyFacade } from "#property/app";

import { Merchant } from "../auth/merchant.decorator";
import { MerchantGuard } from "../auth/merchant.guard";
import { Public } from "../auth/public.decorator";
import { User } from "../auth/user.decorator";
import { OrgRoles } from "../organization/org-roles.decorator";
import { OrgRolesGuard } from "../organization/org-roles.guard";

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

  @Query(() => PaginatePropertiesOutput)
  @Public()
  searchProperties(@Args("input") input: SearchPropertiesInput) {
    return {
      total: 0,
      per_page: 0,
      last_page: 0,
      current_page: 0,
      items: [],
    };
  }

  @Mutation(() => Boolean)
  @OrgRoles(OrgRole.MANAGER)
  async createProperty(
    @Args("input") input: CreatePropertyInput,
    @User() user_id: string,
    @Merchant() merchant_id: string,
  ) {
    await this.propertyFacade.createProperty(
      CreatePropertyInputMapper.toInput(input, user_id, merchant_id),
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
