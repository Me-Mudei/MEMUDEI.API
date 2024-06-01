import { IsString } from 'class-validator';

export class PreSignedUrlInput {
  @IsString()
  filename: string;

  @IsString()
  content_type: string;
}
