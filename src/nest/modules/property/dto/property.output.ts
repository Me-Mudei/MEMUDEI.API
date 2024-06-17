import { Field, ObjectType } from "@nestjs/graphql";
import {
  PropertyOutput as CorePropertyOutput,
  DetailOutput as CoreDetailOutput,
  MediaOutput as CoreMediaOutput,
  FileOutput as CoreFileOutput,
  AddressLocationOutput as CoreAddressLocationOutput,
  AddressOutput as CoreAddressOutput,
} from "#property/app";

import { PropertyStatus, PropertyType, DetailType } from "./property.enum";

@ObjectType()
export class PropertyOutput implements CorePropertyOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => PropertyType)
  property_type: PropertyType;

  @Field(() => PropertyStatus)
  status: PropertyStatus;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}

@ObjectType()
export class DetailOutput implements CoreDetailOutput {
  @Field(() => String)
  id: string;

  @Field(() => DetailType)
  type: DetailType;

  @Field(() => String)
  key: string;

  @Field(() => Number, { nullable: true })
  value?: number;

  @Field(() => String, { nullable: true })
  unit?: string;

  @Field(() => Boolean, { nullable: true })
  available?: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}

@ObjectType()
export class FileOutput implements CoreFileOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  subtype: string;

  @Field(() => String)
  url: string;
}

@ObjectType()
export class MediaOutput implements CoreMediaOutput {
  @Field(() => FileOutput)
  file: FileOutput;

  @Field(() => Number)
  position: number;

  @Field(() => String, { nullable: true })
  description?: string;
}

@ObjectType()
export class AddressLocationOutput implements CoreAddressLocationOutput {
  @Field(() => Number)
  lat: number;

  @Field(() => Number)
  lng: number;
}

@ObjectType()
export class AddressOutput implements CoreAddressOutput {
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

  @Field(() => String, { nullable: true })
  district?: string;

  @Field(() => String, { nullable: true })
  complement?: string;

  @Field(() => AddressLocationOutput)
  location: AddressLocationOutput;
}
