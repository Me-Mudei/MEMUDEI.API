import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserOutput } from '../../user/dto/user.output';
import { PropertyStatus } from './property.enum';

@ObjectType()
export class LocationOutput {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  lat: number;

  @Field(() => Int)
  lng: number;
}

@ObjectType()
export class AddressOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  zip_code: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  street: string;

  @Field(() => String)
  country: string;

  @Field(() => LocationOutput)
  location: LocationOutput;

  @Field(() => String, { nullable: true })
  district?: string;

  @Field(() => String, { nullable: true })
  complement?: string;
}

@ObjectType()
export class PhotoOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  filename: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  subtype: string;

  @Field(() => Int)
  position: number;

  @Field(() => String, { nullable: true })
  description?: string;
}

@ObjectType()
export class PropertyFloorPlanOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  key: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  value: number;

  @Field(() => String, { nullable: true })
  unit?: string;
}

@ObjectType()
export class PropertyPropertyDetailOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  key: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  available: boolean;
}

@ObjectType()
export class PropertyCondominiumDetailOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  key: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  available: boolean;
}

@ObjectType()
export class PropertyRuleOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  key: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  allowed: boolean;
}

@ObjectType()
export class PropertyChargeOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  key: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int)
  amount: number;
}

@ObjectType()
export class PropertyOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => PropertyStatus, { nullable: true })
  status?: PropertyStatus;

  @Field(() => AddressOutput)
  address: AddressOutput;

  @Field(() => String)
  property_type: string;

  @Field(() => String)
  property_relationship: string;

  @Field(() => String)
  privacy_type: string;

  @Field(() => [PropertyFloorPlanOutput])
  floor_plans: PropertyFloorPlanOutput[];

  @Field(() => [PropertyPropertyDetailOutput])
  property_details: PropertyPropertyDetailOutput[];

  @Field(() => [PropertyCondominiumDetailOutput])
  condominium_details: PropertyCondominiumDetailOutput[];

  @Field(() => [PropertyRuleOutput])
  rules: PropertyRuleOutput[];

  @Field(() => [PhotoOutput])
  photos: PhotoOutput[];

  @Field(() => [PropertyChargeOutput])
  charges: PropertyChargeOutput[];

  @Field(() => UserOutput, { nullable: true })
  owner?: UserOutput;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
