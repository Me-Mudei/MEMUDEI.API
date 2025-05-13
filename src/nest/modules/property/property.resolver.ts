import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { AuthUserOutput } from "#auth/app";
import { GlobalRole } from "#auth/domain";
import { OrgRole } from "#merchant/domain";
import { PropertyFacade } from "#property/app";

import { GlobalRoles } from "../auth/global-roles.decorator";
import { Public } from "../auth/public.decorator";
import { User } from "../auth/user.decorator";
import { Merchant } from "../merchant/merchant.decorator";
import { OrgRoles } from "../organization/org-roles.decorator";

import {
  CreatePropertyInput,
  CreatePropertyInputMapper,
} from "./dto/create-property.input";
import { GetPropertyInput } from "./dto/get-property.input";
import { PaginatePropertiesOutput } from "./dto/paginate-properties.output";
import {
  PropertyOutput,
  DetailOutput,
  MediaOutput,
  AddressOutput,
} from "./dto/property.output";
import { SearchPropertiesInput } from "./dto/search-properties.input";
import {
  UpdatePropertyInput,
  UpdatePropertyInputMapper,
} from "./dto/update-property.input";

@Resolver(() => PropertyOutput)
export class PropertyResolver {
  constructor(private readonly propertyFacade: PropertyFacade) {}

  @ResolveField(() => [DetailOutput], { nullable: true })
  async details(@Parent() property: PropertyOutput) {
    return this.propertyFacade.getPropertyDetails({
      property_id: property.id,
    });
  }

  @ResolveField(() => [MediaOutput], { nullable: true })
  async media(@Parent() property: PropertyOutput) {
    return this.propertyFacade.getPropertyMedia({
      property_id: property.id,
    });
  }

  @ResolveField(() => AddressOutput)
  async address(@Parent() property: PropertyOutput) {
    return this.propertyFacade.getPropertyAddress({
      property_id: property.id,
    });
  }

  @Public()
  @Query(() => PropertyOutput)
  getProperty(@Args("input") input: GetPropertyInput) {
    return this.propertyFacade.getProperty({ id: input.id });
  }

  @Public()
  @Query(() => PaginatePropertiesOutput)
  searchProperties(
    @Args("input", { nullable: true, defaultValue: {} })
    input?: SearchPropertiesInput,
  ) {
    return this.propertyFacade.searchProperties(input);
  }

  @GlobalRoles(GlobalRole.ADMIN)
  @OrgRoles(OrgRole.OWNER, OrgRole.MANAGER)
  @Mutation(() => PropertyOutput)
  async createProperty(
    @Args("input") input: CreatePropertyInput,
    @User() user: AuthUserOutput,
    @Merchant() merchant_id: string,
  ) {
    return this.propertyFacade.createProperty(
      CreatePropertyInputMapper.toInput(input, user.id, merchant_id),
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
