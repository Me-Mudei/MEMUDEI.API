import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GlobalRole } from "#auth/domain";
import { OrgRole } from "#organization/domain";
import { PropertyFacade } from "#property/app";

import { GlobalRoles } from "../auth/global-roles.decorator";
import { Public } from "../auth/public.decorator";
import { User } from "../auth/user.decorator";
import { Merchant } from "../organization/merchant.decorator";
import { OrgRoles } from "../organization/org-roles.decorator";

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
  searchProperties(
    @Args("input", { nullable: true, defaultValue: {} })
    input?: SearchPropertiesInput,
    @Merchant() merchant_id?: string,
  ) {
    const filter = { ...input.filter, merchant_id };
    return this.propertyFacade.searchProperties({
      ...input,
      filter,
    });
  }

  @GlobalRoles(GlobalRole.ADMIN)
  @OrgRoles(OrgRole.OWNER, OrgRole.MANAGER)
  @Mutation(() => PropertyOutput)
  async createProperty(
    @Args("input") input: CreatePropertyInput,
    @User() user_id: string,
    @Merchant() merchant_id: string,
  ) {
    return this.propertyFacade.createProperty(
      CreatePropertyInputMapper.toInput(input, user_id, merchant_id),
    );
  }

  @GlobalRoles(GlobalRole.ADMIN)
  @OrgRoles(OrgRole.OWNER, OrgRole.MANAGER)
  @Mutation(() => PropertyOutput)
  async updateProperty(@Args("input") input: UpdatePropertyInput) {
    return this.propertyFacade.updateProperty(
      UpdatePropertyInputMapper.toInput(input),
    );
  }
}
