import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

@InputType()
export class File {
  @Field()
  @Matches(/\.(png|jpeg|webp|jpg)$/i)
  filename: string;

  @Field()
  @IsString()
  external_id: string;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  position?: number;
}

@InputType()
export class UploadFileInput {
  @ValidateNested()
  @Type(() => File)
  @Field(() => File)
  file: File;
}

export class GetFileInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  options?: FileOptions;
}

export enum FileVariant {
  ORIGINAL = 'original',
  THUMBNAIL = 'thumbnail',
  LANDSCAPE = 'landscape',
  PORTRAIT = 'portrait',
  SQUARE = 'square',
}

export enum Fit {
  CONTAIN = 'contain',
  COVER = 'cover',
  FILL = 'fill',
  INSIDE = 'inside',
  OUTSIDE = 'outside',
}

export enum FileFormat {
  WEBP = 'webp',
  PNG = 'png',
  JPEG = 'jpeg',
}
export class FileOptions {
  @IsNumberString({ no_symbols: true })
  @Matches(/^[1-9]\d*$/, { message: 'width must be greater than 0' })
  @IsOptional()
  width?: string;

  @IsNumberString({ no_symbols: true })
  @Matches(/^[1-9]\d*$/, { message: 'height must be greater than 0' })
  @IsOptional()
  height?: string;

  @IsNumberString({ no_symbols: true })
  @Matches(/^(?:100|[1-9]?[0-9])$/, {
    message: 'quality must be between 0 and 100',
  })
  @IsOptional()
  quality?: string;

  @IsEnum(FileFormat)
  @IsOptional()
  format?: string;

  @IsEnum(Fit)
  @IsOptional()
  fit?: Fit;

  @IsEnum(FileVariant)
  @IsOptional()
  variant?: FileVariant;
}
