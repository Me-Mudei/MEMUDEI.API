import { IsString } from 'class-validator';

export class PreSignedUrlOutput {
  @IsString()
  url: string;

  @IsString()
  external_id: string;

  fields: Record<string, string>;
}
