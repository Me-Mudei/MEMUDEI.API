import { CreatePropertyInput as CoreCreatePropertyInput } from '#property/app';
import { PropertyStatus } from './property.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAddressLocationInput {
  @Field(() => Number)
  lat: number;

  @Field(() => Number)
  lng: number;
}

@InputType()
export class CreatePropertyAddressInput {
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

  @Field(() => CreateAddressLocationInput)
  location: CreateAddressLocationInput;

  @Field(() => String, { nullable: true })
  district: string;

  @Field(() => String, { nullable: true })
  complement: string;
}

@InputType()
export class CreatePropertyFloorPlanInput {
  @Field(() => String)
  key: string;

  @Field(() => Number)
  value: number;
}

@InputType()
export class CreatePropertyPropertyDetailInput {
  @Field(() => String)
  key: string;

  @Field(() => Boolean)
  available: boolean;
}

@InputType()
export class CreatePropertyCondominiumDetailInput {
  @Field(() => String)
  key: string;

  @Field(() => Boolean)
  available: boolean;
}

@InputType()
export class CreatePropertyRuleInput {
  @Field(() => String)
  key: string;

  @Field(() => Boolean)
  allowed: boolean;
}

@InputType()
export class CreatePropertyChargeInput {
  @Field(() => String)
  key: string;

  @Field(() => Number)
  amount: number;
}

@InputType()
export class CreatePropertyPhotoInput {
  @Field(() => String)
  url: string;

  @Field(() => String)
  filename: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  subtype: string;

  @Field(() => Number)
  position: number;

  @Field(() => String, { nullable: true })
  description: string;
}

@InputType()
export class CreatePropertyInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => PropertyStatus, { nullable: true })
  status: PropertyStatus;

  @Field(() => String)
  property_type: string;

  @Field(() => String)
  property_relationship: string;

  @Field(() => String)
  privacy_type: string;

  @Field(() => String, { nullable: true })
  owner_id: string;

  @Field(() => CreatePropertyAddressInput)
  address: CreatePropertyAddressInput;

  @Field(() => [CreatePropertyFloorPlanInput])
  floor_plans: CreatePropertyFloorPlanInput[];

  @Field(() => [CreatePropertyPropertyDetailInput])
  property_details: CreatePropertyPropertyDetailInput[];

  @Field(() => [CreatePropertyCondominiumDetailInput])
  condominium_details: CreatePropertyCondominiumDetailInput[];

  @Field(() => [CreatePropertyRuleInput])
  rules: CreatePropertyRuleInput[];

  @Field(() => [CreatePropertyChargeInput])
  charges: CreatePropertyChargeInput[];

  @Field(() => [CreatePropertyPhotoInput], { nullable: true })
  photos: CreatePropertyPhotoInput[];
}

export class CreatePropertyInputMapper {
  static toInput(
    input: CreatePropertyInput,
    user_id: string,
  ): CoreCreatePropertyInput {
    const { owner_id, ...property } = input;
    return {
      ...property,
      user_id: owner_id ?? user_id,
    };
  }
}

// export class CreatePropertyOutputMapper {
//   static toOutput(property: CoreCreatePropertyOutput): any {
//     return {
//       id: property.id,
//       status: property.status as any,
//       created_at: property.created_at,
//       updated_at: property.updated_at
//     };
//   }
// }
