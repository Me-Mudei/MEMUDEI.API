import { Field, InputType } from "@nestjs/graphql";
import {
  CreatePropertyInput as CoreCreatePropertyInput,
  DetailInput,
  FileInput,
  AddressInput,
  LocationInput,
} from "#property/app";

import { PropertyStatus, PropertyType, DetailType } from "./property.enum";

@InputType()
export class CreateLocationInput implements LocationInput {
  @Field(() => Number)
  lat: number;

  @Field(() => Number)
  lng: number;
}

@InputType()
export class CreateAddressInput implements AddressInput {
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

  @Field(() => CreateLocationInput)
  location: CreateLocationInput;

  @Field(() => String, { nullable: true })
  district: string;

  @Field(() => String, { nullable: true })
  complement: string;
}

@InputType()
export class CreateDetailInput implements DetailInput {
  @Field(() => DetailType)
  type: DetailType;

  @Field(() => String)
  key: string;

  @Field(() => Boolean, { nullable: true })
  available?: boolean;

  @Field(() => Number, { nullable: true })
  value?: number;

  @Field(() => String, { nullable: true })
  unit?: string;
}

@InputType()
export class CreateFileInput implements FileInput {
  @Field(() => String)
  external_id: string;

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
  description?: string;
}

@InputType()
export class CreatePropertyInput
  implements Omit<CoreCreatePropertyInput, "created_by_id" | "merchant_id">
{
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => PropertyStatus, { nullable: true })
  status: PropertyStatus;

  @Field(() => PropertyType)
  property_type: PropertyType;

  @Field(() => CreateAddressInput)
  address: CreateAddressInput;

  @Field(() => [CreateDetailInput])
  details: CreateDetailInput[];

  @Field(() => [CreateFileInput], { nullable: true })
  media: CreateFileInput[];
}

export class CreatePropertyInputMapper {
  static toInput(
    input: CreatePropertyInput,
    user_id: string,
    merchant_id: string,
  ): CoreCreatePropertyInput {
    return {
      ...input,
      created_by_id: user_id,
      merchant_id,
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
