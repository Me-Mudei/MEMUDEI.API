#!/bin/sh
CLASS_NAME=$1 # ClassName
FILE_NAME=$(echo $1 | awk '{print tolower(substr($0,1,1)) substr($0,2)}' | awk '{gsub(/[A-Z]/,"-"tolower($1))}1') # Convert to kebab-case
VAR_NAME=$(echo $1 | awk '{print tolower(substr($0,1,1)) substr($0,2)}') # Convert to camelCase

mkdir -p ./src/${FILE_NAME[j]}/app/dto
mkdir -p ./src/${FILE_NAME[j]}/app/facade
mkdir -p ./src/${FILE_NAME[j]}/app/use-cases
mkdir -p ./src/${FILE_NAME[j]}/domain
mkdir -p ./src/${FILE_NAME[j]}/infra/factory

touch ./src/${FILE_NAME[j]}/index.ts
touch ./src/${FILE_NAME[j]}/app/index.ts
touch ./src/${FILE_NAME[j]}/domain/index.ts
touch ./src/${FILE_NAME[j]}/infra/index.ts

touch ./src/${FILE_NAME[j]}/app/dto/index.ts
touch ./src/${FILE_NAME[j]}/app/facade/index.ts
touch ./src/${FILE_NAME[j]}/app/use-cases/index.ts
touch ./src/${FILE_NAME[j]}/infra/factory/index.ts

touch ./src/${FILE_NAME[j]}/app/dto/${FILE_NAME[j]}.output.ts
touch ./src/${FILE_NAME[j]}/app/dto/create-${FILE_NAME[j]}.input.ts
touch ./src/${FILE_NAME[j]}/app/dto/update-${FILE_NAME[j]}.input.ts
touch ./src/${FILE_NAME[j]}/app/dto/get-${FILE_NAME[j]}.input.ts

touch ./src/${FILE_NAME[j]}/app/facade/${FILE_NAME[j]}.facade.ts

touch ./src/${FILE_NAME[j]}/app/use-cases/create-${FILE_NAME[j]}.use-case.ts
touch ./src/${FILE_NAME[j]}/app/use-cases/get-${FILE_NAME[j]}.use-case.ts
touch ./src/${FILE_NAME[j]}/app/use-cases/update-${FILE_NAME[j]}.use-case.ts

touch ./src/${FILE_NAME[j]}/domain/${FILE_NAME[j]}.entity.ts

touch ./src/${FILE_NAME[j]}/infra/factory/${FILE_NAME[j]}-facade.factory.ts
touch ./src/${FILE_NAME[j]}/infra/factory/${FILE_NAME[j]}-in-memory-facade.factory.ts

# Make index.ts
cat <<EOF >> src/${FILE_NAME[j]}/index.ts
export * from "./app";
export * from "./domain";
export * from "./infra";
EOF

# Make app/index.ts
cat <<EOF >> src/${FILE_NAME[j]}/app/index.ts
export * from "./dto";
export * from "./facade";
export * from "./use-cases";
EOF

# Make domain/index.ts
cat <<EOF >> src/${FILE_NAME[j]}/domain/index.ts
export * from "./${FILE_NAME[j]}.entity";
EOF

# Make infra/index.ts
cat <<EOF >> src/${FILE_NAME[j]}/infra/index.ts
export * from "./factory";
EOF

# Make app/dto/index.ts
cat <<EOF >> src/${FILE_NAME[j]}/app/dto/index.ts
export * from "./${FILE_NAME[j]}.output";
export * from "./create-${FILE_NAME[j]}.input";
export * from "./update-${FILE_NAME[j]}.input";
export * from "./get-${FILE_NAME[j]}.input";
EOF

# Make app/facade/index.ts
cat <<EOF >> src/${FILE_NAME[j]}/app/facade/index.ts
export * from "./${FILE_NAME[j]}.facade";
EOF

# Make app/use-cases/index.ts
cat <<EOF >> src/${FILE_NAME[j]}/app/use-cases/index.ts
export * from "./create-${FILE_NAME[j]}.use-case";
export * from "./get-${FILE_NAME[j]}.use-case";
export * from "./update-${FILE_NAME[j]}.use-case";
EOF

# Make infra/factory/index.ts
cat <<EOF >> src/${FILE_NAME[j]}/infra/factory/index.ts
export * from "./${FILE_NAME[j]}-facade.factory";
export * from "./${FILE_NAME[j]}-in-memory-facade.factory";
EOF

# Make facade factory
cat <<EOF >> src/${FILE_NAME[j]}/infra/factory/${FILE_NAME[j]}-facade.factory.ts
import { Connection } from "#shared/infra";

import { ${CLASS_NAME[j]}Facade, Create${CLASS_NAME[j]}UseCase, Get${CLASS_NAME[j]}UseCase, Update${CLASS_NAME[j]}UseCase } from "../../app";

export class ${CLASS_NAME[j]}FacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const createUseCase = new Create${CLASS_NAME[j]}UseCase(prisma);
    const updateUseCase = new Update${CLASS_NAME[j]}UseCase(prisma);
    const getUseCase = new Get${CLASS_NAME[j]}UseCase(prisma);
    return new ${CLASS_NAME[j]}Facade({
      createUseCase,
      updateUseCase,
      getUseCase,
    });
  }
}
EOF

# Make in-memory facade factory
cat <<EOF >> src/${FILE_NAME[j]}/infra/factory/${FILE_NAME[j]}-in-memory-facade.factory.ts
import { Connection } from "#shared/infra";

import { ${CLASS_NAME[j]}Facade, Create${CLASS_NAME[j]}UseCase, Get${CLASS_NAME[j]}UseCase, Update${CLASS_NAME[j]}UseCase } from "../../app";

export class ${CLASS_NAME[j]}InMemoryFacadeFactory {
  static create() {
    const prisma = Connection.getInstance("prismock");
    const createUseCase = new Create${CLASS_NAME[j]}UseCase(prisma);
    const updateUseCase = new Update${CLASS_NAME[j]}UseCase(prisma);
    const getUseCase = new Get${CLASS_NAME[j]}UseCase(prisma);
    return new ${CLASS_NAME[j]}Facade({
      createUseCase,
      updateUseCase,
      getUseCase,
    });
  }
}
EOF

# Make Entity
cat <<EOF >> src/${FILE_NAME[j]}/domain/${FILE_NAME[j]}.entity.ts
import { Entity, UniqueEntityId } from "#shared/domain";
export type ${CLASS_NAME[j]}Props = {
  id?: UniqueEntityId;
  example: string;
  created_at?: Date;
  updated_at?: Date;
};

export class ${CLASS_NAME[j]} extends Entity<${CLASS_NAME[j]}Props> {
  private _example: string;
  constructor(props: ${CLASS_NAME[j]}Props) {
    super(props);
    this._example = props.example;
  }

  get example(): string {
    return this._example;
  }
}
EOF
# Make Output DTO
cat <<EOF >> src/${FILE_NAME[j]}/app/dto/${FILE_NAME[j]}.output.ts
export type ${CLASS_NAME[j]}Output = {
  id: string;
  example: string;
  created_at: Date;
  updated_at: Date;
};

export class ${CLASS_NAME[j]}OutputMapper {
  static toOutput(entity: any): ${CLASS_NAME[j]}Output {
    return {
      id: entity.id,
      example: entity.example,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }
}
EOF
# Make Create Input DTO
cat <<EOF >> src/${FILE_NAME[j]}/app/dto/create-${FILE_NAME[j]}.input.ts
export interface Create${CLASS_NAME[j]}Input {
  example: string;
}
EOF

# Make Update Input DTO
cat <<EOF >> src/${FILE_NAME[j]}/app/dto/update-${FILE_NAME[j]}.input.ts
export interface Update${CLASS_NAME[j]}Input {
  id: string;
  example?: string;
}
EOF

# Make Get DTO
cat <<EOF >> src/${FILE_NAME[j]}/app/dto/get-${FILE_NAME[j]}.input.ts
export interface Get${CLASS_NAME[j]}Input {
  id: string;
}
EOF

# Make facade
cat <<EOF >> src/${FILE_NAME[j]}/app/facade/${FILE_NAME[j]}.facade.ts
import { Create${CLASS_NAME[j]}Input, Get${CLASS_NAME[j]}Input, Update${CLASS_NAME[j]}Input } from "../dto";
import { Create${CLASS_NAME[j]}UseCase, Get${CLASS_NAME[j]}UseCase, Update${CLASS_NAME[j]}UseCase } from "../use-cases";

export interface ${CLASS_NAME[j]}FacadeProps {
  createUseCase: Create${CLASS_NAME[j]}UseCase;
  updateUseCase: Update${CLASS_NAME[j]}UseCase;
  getUseCase: Get${CLASS_NAME[j]}UseCase;
}

export class ${CLASS_NAME[j]}Facade {
  private _createUseCase: Create${CLASS_NAME[j]}UseCase;
  private _updateUseCase: Update${CLASS_NAME[j]}UseCase;
  private _getUseCase: Get${CLASS_NAME[j]}UseCase;

  constructor(readonly props: ${CLASS_NAME[j]}FacadeProps) {
    this._createUseCase = props.createUseCase;
    this._updateUseCase = props.updateUseCase;
    this._getUseCase = props.getUseCase;
  }

  async create${CLASS_NAME[j]}(input: Create${CLASS_NAME[j]}Input) {
    return await this._createUseCase.execute(input);
  }

  async get${CLASS_NAME[j]}(input: Get${CLASS_NAME[j]}Input) {
    return await this._getUseCase.execute(input);
  }

  async update${CLASS_NAME[j]}(input: Update${CLASS_NAME[j]}Input) {
    return await this._updateUseCase.execute(input);
  }
}
EOF

# Make create use-case
cat <<EOF >> src/${FILE_NAME[j]}/app/use-cases/create-${FILE_NAME[j]}.use-case.ts
import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  Create${CLASS_NAME[j]}Input,
  ${CLASS_NAME[j]}Output,
  ${CLASS_NAME[j]}OutputMapper,
} from "../dto";

export class Create${CLASS_NAME[j]}UseCase
  implements UseCase<Create${CLASS_NAME[j]}Input, ${CLASS_NAME[j]}Output>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: Create${CLASS_NAME[j]}Input): Promise<${CLASS_NAME[j]}Output> {
    this.logger.info({ message: "Create ${CLASS_NAME[j]} Use Case" });
    const ${VAR_NAME[j]} = await this.prisma.${VAR_NAME[j]}.create({
      data: {
        example: input.example,
      },
    });
    return ${CLASS_NAME[j]}OutputMapper.toOutput(${VAR_NAME[j]});
  }
}
EOF

# Make get use-case
cat <<EOF >> src/${FILE_NAME[j]}/app/use-cases/get-${FILE_NAME[j]}.use-case.ts
import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  Get${CLASS_NAME[j]}Input,
  ${CLASS_NAME[j]}Output,
  ${CLASS_NAME[j]}OutputMapper,
} from "../dto";

export class Get${CLASS_NAME[j]}UseCase
  implements UseCase<Get${CLASS_NAME[j]}Input, ${CLASS_NAME[j]}Output>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: Get${CLASS_NAME[j]}Input): Promise<${CLASS_NAME[j]}Output> {
    this.logger.info({ message: "Get ${CLASS_NAME[j]} Use Case" });
    const ${VAR_NAME[j]} = await this.prisma.${VAR_NAME[j]}.findFirst({
      where: {
        id: input.id,
      },
    });
    return ${CLASS_NAME[j]}OutputMapper.toOutput(${VAR_NAME[j]});
  }
}
EOF

# Make update use-case
cat <<EOF >> src/${FILE_NAME[j]}/app/use-cases/update-${FILE_NAME[j]}.use-case.ts
import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  Update${CLASS_NAME[j]}Input,
  ${CLASS_NAME[j]}Output,
  ${CLASS_NAME[j]}OutputMapper,
} from "../dto";

export class Update${CLASS_NAME[j]}UseCase
  implements UseCase<Update${CLASS_NAME[j]}Input, ${CLASS_NAME[j]}Output>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: Update${CLASS_NAME[j]}Input): Promise<${CLASS_NAME[j]}Output> {
    this.logger.info({ message: "Update ${CLASS_NAME[j]} Use Case" });
    const ${VAR_NAME[j]} = await this.prisma.${VAR_NAME[j]}.update({
      where: {
        id: input.id,
      },
      data: {
        example: input.example,
      },
    });
    return ${CLASS_NAME[j]}OutputMapper.toOutput(${VAR_NAME[j]});
  }
}
EOF

echo "Resource ${CLASS_NAME[j]} created successfully"
CREATE="\033[0;32mCREATE\033[0m"
echo "$CREATE src/${FILE_NAME[j]}/app/dto/${FILE_NAME[j]}.output.ts"
echo "$CREATE src/${FILE_NAME[j]}/app/dto/create-${FILE_NAME[j]}.input.ts"
echo "$CREATE src/${FILE_NAME[j]}/app/dto/update-${FILE_NAME[j]}.input.ts"
echo "$CREATE src/${FILE_NAME[j]}/app/dto/get-${FILE_NAME[j]}.input.ts"
echo "$CREATE src/${FILE_NAME[j]}/app/facade/${FILE_NAME[j]}.facade.ts"
echo "$CREATE src/${FILE_NAME[j]}/app/use-cases/create-${FILE_NAME[j]}.use-case.ts"
echo "$CREATE src/${FILE_NAME[j]}/app/use-cases/get-${FILE_NAME[j]}.use-case.ts"
echo "$CREATE src/${FILE_NAME[j]}/app/use-cases/update-${FILE_NAME[j]}.use-case.ts"
echo "$CREATE src/${FILE_NAME[j]}/domain/${FILE_NAME[j]}.entity.ts"
echo "$CREATE src/${FILE_NAME[j]}/infra/factory/${FILE_NAME[j]}-facade.factory.ts"
echo "$CREATE src/${FILE_NAME[j]}/infra/factory/${FILE_NAME[j]}-in-memory-facade.factory.ts"