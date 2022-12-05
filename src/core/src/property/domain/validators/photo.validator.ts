import { IsDate, IsOptional } from 'class-validator';
import { ClassValidatorFields } from '#shared/domain/validators/class-validator-fields';
import { PhotoProps } from '../entities/photo.entity';

export class PhotoRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ created_at }: PhotoProps) {
    Object.assign(this, { created_at });
  }
}

export class PhotoValidator extends ClassValidatorFields<PhotoRules> {
  validate(data: PhotoProps): boolean {
    return super.validate(new PhotoRules(data ?? ({} as any)));
  }
}

export default class PhotoValidatorFactory {
  static create() {
    return new PhotoValidator();
  }
}
