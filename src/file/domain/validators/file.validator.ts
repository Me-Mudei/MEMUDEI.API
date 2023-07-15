import { ClassValidatorFields } from "#shared/domain";
import { IsDate, IsOptional } from "class-validator";

import { FileProps } from "../entities/file.entity";

export class FileRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ created_at }: FileProps) {
    Object.assign(this, { created_at });
  }
}

export class FileValidator extends ClassValidatorFields<FileRules> {
  validate(data: FileProps): boolean {
    return super.validate(new FileRules(data ?? ({} as any)));
  }
}

export default class FileValidatorFactory {
  static create() {
    return new FileValidator();
  }
}
