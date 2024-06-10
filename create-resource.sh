#!/bin/sh
CLASS_NAME=$1 # ClassName
FILE_NAME=$(echo $1 | awk '{print tolower(substr($0,1,1)) substr($0,2)}' | awk '{gsub(/[A-Z]/,"-"tolower($1))}1') # Convert to kebab-case
VAR_NAME=$(echo $1 | awk '{print tolower(substr($0,1,1)) substr($0,2)}') # Convert to camelCase

# Make directories
mkdir -p ./src/${FILE_NAME}/app/dto
mkdir -p ./src/${FILE_NAME}/app/facade
mkdir -p ./src/${FILE_NAME}/app/use-cases
mkdir -p ./src/${FILE_NAME}/domain
mkdir -p ./src/${FILE_NAME}/infra/factory

# Make directories for nest
mkdir -p ./src/nest/modules/${FILE_NAME}/dto

# Make index files
touch ./src/${FILE_NAME}/index.ts
touch ./src/${FILE_NAME}/domain/index.ts
touch ./src/${FILE_NAME}/app/index.ts
touch ./src/${FILE_NAME}/infra/index.ts

# Make DTOs
touch ./src/${FILE_NAME}/app/dto/index.ts
touch ./src/${FILE_NAME}/app/dto/${FILE_NAME}.output.ts
touch ./src/${FILE_NAME}/app/dto/get-${FILE_NAME}.input.ts
touch ./src/${FILE_NAME}/app/dto/create-${FILE_NAME}.input.ts
touch ./src/${FILE_NAME}/app/dto/update-${FILE_NAME}.input.ts
touch ./src/${FILE_NAME}/app/dto/remove-${FILE_NAME}.input.ts

# Make facade
touch ./src/${FILE_NAME}/app/facade/index.ts
touch ./src/${FILE_NAME}/app/facade/${FILE_NAME}.facade.ts

# Make use-cases
touch ./src/${FILE_NAME}/app/use-cases/index.ts
touch ./src/${FILE_NAME}/app/use-cases/get-${FILE_NAME}.use-case.ts
touch ./src/${FILE_NAME}/app/use-cases/create-${FILE_NAME}.use-case.ts
touch ./src/${FILE_NAME}/app/use-cases/update-${FILE_NAME}.use-case.ts
touch ./src/${FILE_NAME}/app/use-cases/remove-${FILE_NAME}.use-case.ts

# Make domain entities
touch ./src/${FILE_NAME}/domain/${FILE_NAME}.entity.ts

# Make infra factories
touch ./src/${FILE_NAME}/infra/factory/index.ts
touch ./src/${FILE_NAME}/infra/factory/${FILE_NAME}-facade.factory.ts
touch ./src/${FILE_NAME}/infra/factory/${FILE_NAME}-in-memory-facade.factory.ts

# Make nest DTOs
touch ./src/nest/modules/${FILE_NAME}/dto/get-${FILE_NAME}.input.ts
touch ./src/nest/modules/${FILE_NAME}/dto/create-${FILE_NAME}.input.ts
touch ./src/nest/modules/${FILE_NAME}/dto/update-${FILE_NAME}.input.ts
touch ./src/nest/modules/${FILE_NAME}/dto/remove-${FILE_NAME}.input.ts

# Make nest files
touch ./src/nest/modules/${FILE_NAME}/${FILE_NAME}.module.ts
touch ./src/nest/modules/${FILE_NAME}/${FILE_NAME}.resolver.ts

# Make index.ts
cat <<EOF >> src/${FILE_NAME}/index.ts
export * from "./app";
export * from "./domain";
export * from "./infra";
EOF

# Make app/index.ts
cat <<EOF >> src/${FILE_NAME}/app/index.ts
export * from "./dto";
export * from "./facade";
export * from "./use-cases";
EOF

# Make domain/index.ts
cat <<EOF >> src/${FILE_NAME}/domain/index.ts
export * from "./${FILE_NAME}.entity";
EOF

# Make infra/index.ts
cat <<EOF >> src/${FILE_NAME}/infra/index.ts
export * from "./factory";
EOF

# Make app/dto/index.ts
cat <<EOF >> src/${FILE_NAME}/app/dto/index.ts
export * from "./${FILE_NAME}.output";
export * from "./get-${FILE_NAME}.input";
export * from "./create-${FILE_NAME}.input";
export * from "./update-${FILE_NAME}.input";
export * from "./remove-${FILE_NAME}.input";
EOF

# Make app/facade/index.ts
cat <<EOF >> src/${FILE_NAME}/app/facade/index.ts
export * from "./${FILE_NAME}.facade";
EOF

# Make app/use-cases/index.ts
cat <<EOF >> src/${FILE_NAME}/app/use-cases/index.ts
export * from "./get-${FILE_NAME}.use-case";
export * from "./create-${FILE_NAME}.use-case";
export * from "./update-${FILE_NAME}.use-case";
export * from "./remove-${FILE_NAME}.use-case";
EOF

# Make infra/factory/index.ts
cat <<EOF >> src/${FILE_NAME}/infra/factory/index.ts
export * from "./${FILE_NAME}-facade.factory";
export * from "./${FILE_NAME}-in-memory-facade.factory";
EOF

# Make Entity
cat <<EOF >> src/${FILE_NAME}/domain/${FILE_NAME}.entity.ts
import { Entity, UniqueEntityId } from "#shared/domain";
export type ${CLASS_NAME}Props = {
  id?: UniqueEntityId;
  example: string;
  created_at?: Date;
  updated_at?: Date;
};

export class ${CLASS_NAME} extends Entity<${CLASS_NAME}Props> {
  private _example: string;
  constructor(props: ${CLASS_NAME}Props) {
    super(props);
    this._example = props.example;
  }

  get example(): string {
    return this._example;
  }
}
EOF

# Make Output DTO
cat <<EOF >> src/${FILE_NAME}/app/dto/${FILE_NAME}.output.ts
export type ${CLASS_NAME}Output = {
  id: string;
  example: string;
  created_at: Date;
  updated_at: Date;
};

export class ${CLASS_NAME}OutputMapper {
  static toOutput(entity: any): ${CLASS_NAME}Output {
    return {
      id: entity.id,
      example: entity.example,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }
}
EOF

# Make Get DTO
cat <<EOF >> src/${FILE_NAME}/app/dto/get-${FILE_NAME}.input.ts
export interface Get${CLASS_NAME}Input {
  id: string;
}
EOF

# Make Create Input DTO
cat <<EOF >> src/${FILE_NAME}/app/dto/create-${FILE_NAME}.input.ts
export interface Create${CLASS_NAME}Input {
  example: string;
}
EOF

# Make Update Input DTO
cat <<EOF >> src/${FILE_NAME}/app/dto/update-${FILE_NAME}.input.ts
export interface Update${CLASS_NAME}Input {
  id: string;
  example?: string;
}
EOF

# Make Remove Input DTO
cat <<EOF >> src/${FILE_NAME}/app/dto/remove-${FILE_NAME}.input.ts
export interface Remove${CLASS_NAME}Input {
  id: string;
}
EOF

# Make get use-case
cat <<EOF >> src/${FILE_NAME}/app/use-cases/get-${FILE_NAME}.use-case.ts
import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  Get${CLASS_NAME}Input,
  ${CLASS_NAME}Output,
  ${CLASS_NAME}OutputMapper,
} from "../dto";

export class Get${CLASS_NAME}UseCase
  implements UseCase<Get${CLASS_NAME}Input, ${CLASS_NAME}Output>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: Get${CLASS_NAME}Input): Promise<${CLASS_NAME}Output> {
    this.logger.info({ message: "Get ${CLASS_NAME} Use Case" });
    const ${VAR_NAME} = await this.prisma.${VAR_NAME}.findFirst({
      where: {
        id: input.id,
      },
    });
    return ${CLASS_NAME}OutputMapper.toOutput(${VAR_NAME});
  }
}
EOF

# Make create use-case
cat <<EOF >> src/${FILE_NAME}/app/use-cases/create-${FILE_NAME}.use-case.ts
import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  Create${CLASS_NAME}Input,
  ${CLASS_NAME}Output,
  ${CLASS_NAME}OutputMapper,
} from "../dto";

export class Create${CLASS_NAME}UseCase
  implements UseCase<Create${CLASS_NAME}Input, ${CLASS_NAME}Output>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: Create${CLASS_NAME}Input): Promise<${CLASS_NAME}Output> {
    this.logger.info({ message: "Create ${CLASS_NAME} Use Case" });
    const ${VAR_NAME} = await this.prisma.${VAR_NAME}.create({
      data: {
        example: input.example,
      },
    });
    return ${CLASS_NAME}OutputMapper.toOutput(${VAR_NAME});
  }
}
EOF

# Make update use-case
cat <<EOF >> src/${FILE_NAME}/app/use-cases/update-${FILE_NAME}.use-case.ts
import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  Update${CLASS_NAME}Input,
  ${CLASS_NAME}Output,
  ${CLASS_NAME}OutputMapper,
} from "../dto";

export class Update${CLASS_NAME}UseCase
  implements UseCase<Update${CLASS_NAME}Input, ${CLASS_NAME}Output>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: Update${CLASS_NAME}Input): Promise<${CLASS_NAME}Output> {
    this.logger.info({ message: "Update ${CLASS_NAME} Use Case" });
    const ${VAR_NAME} = await this.prisma.${VAR_NAME}.update({
      where: {
        id: input.id,
      },
      data: {
        example: input.example,
      },
    });
    return ${CLASS_NAME}OutputMapper.toOutput(${VAR_NAME});
  }
}
EOF

# Make remove use-case
cat <<EOF >> src/${FILE_NAME}/app/use-cases/remove-${FILE_NAME}.use-case.ts
import { UseCase } from "#shared/app";
import { LoggerInterface, PrismaClient, WinstonLogger } from "#shared/infra";

import {
  Remove${CLASS_NAME}Input,
  ${CLASS_NAME}Output,
  ${CLASS_NAME}OutputMapper,
} from "../dto";

export class Remove${CLASS_NAME}UseCase
  implements UseCase<Remove${CLASS_NAME}Input, ${CLASS_NAME}Output>
{
  private logger: LoggerInterface;
  constructor(readonly prisma: PrismaClient) {
    this.logger = WinstonLogger.getInstance();
  }

  async execute(input: Remove${CLASS_NAME}Input): Promise<${CLASS_NAME}Output> {
    this.logger.info({ message: "Remove ${CLASS_NAME} Use Case" });
    const ${VAR_NAME} = await this.prisma.${VAR_NAME}.delete({
      where: {
        id: input.id,
      },
    });
    return ${CLASS_NAME}OutputMapper.toOutput(${VAR_NAME});
  }
}
EOF

# Make facade
cat <<EOF >> src/${FILE_NAME}/app/facade/${FILE_NAME}.facade.ts
import { Get${CLASS_NAME}Input, Create${CLASS_NAME}Input, Update${CLASS_NAME}Input, Remove${CLASS_NAME}Input } from "../dto";
import { Get${CLASS_NAME}UseCase, Create${CLASS_NAME}UseCase, Update${CLASS_NAME}UseCase, Remove${CLASS_NAME}UseCase } from "../use-cases";

export interface ${CLASS_NAME}FacadeProps {
  getUseCase: Get${CLASS_NAME}UseCase;
  createUseCase: Create${CLASS_NAME}UseCase;
  updateUseCase: Update${CLASS_NAME}UseCase;
  removeUseCase: Remove${CLASS_NAME}UseCase;
}

export class ${CLASS_NAME}Facade {
  private _getUseCase: Get${CLASS_NAME}UseCase;
  private _createUseCase: Create${CLASS_NAME}UseCase;
  private _updateUseCase: Update${CLASS_NAME}UseCase;
  private _removeUseCase: Remove${CLASS_NAME}UseCase;

  constructor(readonly props: ${CLASS_NAME}FacadeProps) {
    this._getUseCase = props.getUseCase;
    this._createUseCase = props.createUseCase;
    this._updateUseCase = props.updateUseCase;
    this._removeUseCase = props.removeUseCase;
  }

  async get${CLASS_NAME}(input: Get${CLASS_NAME}Input) {
    return await this._getUseCase.execute(input);
  }

  async create${CLASS_NAME}(input: Create${CLASS_NAME}Input) {
    return await this._createUseCase.execute(input);
  }

  async update${CLASS_NAME}(input: Update${CLASS_NAME}Input) {
    return await this._updateUseCase.execute(input);
  }

  async remove${CLASS_NAME}(input: Remove${CLASS_NAME}Input) {
    return await this._removeUseCase.execute(input);
  }
}
EOF

# Make facade factory
cat <<EOF >> src/${FILE_NAME}/infra/factory/${FILE_NAME}-facade.factory.ts
import { Connection } from "#shared/infra";

import { ${CLASS_NAME}Facade, Get${CLASS_NAME}UseCase, Create${CLASS_NAME}UseCase, Update${CLASS_NAME}UseCase, Remove${CLASS_NAME}UseCase } from "../../app";

export class ${CLASS_NAME}FacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const getUseCase = new Get${CLASS_NAME}UseCase(prisma);
    const createUseCase = new Create${CLASS_NAME}UseCase(prisma);
    const updateUseCase = new Update${CLASS_NAME}UseCase(prisma);
    const removeUseCase = new Remove${CLASS_NAME}UseCase(prisma);
    return new ${CLASS_NAME}Facade({
      getUseCase,
      createUseCase,
      updateUseCase,
      removeUseCase,
    });
  }
}
EOF

# Make in-memory facade factory
cat <<EOF >> src/${FILE_NAME}/infra/factory/${FILE_NAME}-in-memory-facade.factory.ts
import { Connection } from "#shared/infra";

import { ${CLASS_NAME}Facade, Get${CLASS_NAME}UseCase, Create${CLASS_NAME}UseCase, Update${CLASS_NAME}UseCase, Remove${CLASS_NAME}UseCase } from "../../app";

export class ${CLASS_NAME}InMemoryFacadeFactory {
  static create() {
    const prisma = Connection.getInstance("prismock");
    const getUseCase = new Get${CLASS_NAME}UseCase(prisma);
    const createUseCase = new Create${CLASS_NAME}UseCase(prisma);
    const updateUseCase = new Update${CLASS_NAME}UseCase(prisma);
    const removeUseCase = new Remove${CLASS_NAME}UseCase(prisma);
    return new ${CLASS_NAME}Facade({
      getUseCase,
      createUseCase,
      updateUseCase,
      removeUseCase,
    });
  }
}
EOF

# Make nest output
cat <<EOF >> src/nest/modules/${FILE_NAME}/dto/${FILE_NAME}.output.ts
import { ObjectType, Field } from "@nestjs/graphql";
import { ${CLASS_NAME}Output as Core${CLASS_NAME}Output } from "#${FILE_NAME}/app";

@ObjectType()
export class ${CLASS_NAME}Output implements Core${CLASS_NAME}Output {
  @Field(() => String)
  id: string;

  @Field(() => String)
  example: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
EOF

# Make nest get input
cat <<EOF >> src/nest/modules/${FILE_NAME}/dto/get-${FILE_NAME}.input.ts
import { InputType, Field } from "@nestjs/graphql";
import { Get${CLASS_NAME}Input as CoreGet${CLASS_NAME}Input } from "#${FILE_NAME}/app";

@InputType()
export class Get${CLASS_NAME}Input implements CoreGet${CLASS_NAME}Input {
  @Field(() => String)
  id: string;
}
EOF

# Make nest create input
cat <<EOF >> src/nest/modules/${FILE_NAME}/dto/create-${FILE_NAME}.input.ts
import { InputType, Field } from "@nestjs/graphql";
import { Create${CLASS_NAME}Input as CoreCreate${CLASS_NAME}Input } from "#${FILE_NAME}/app";

@InputType()
export class Create${CLASS_NAME}Input implements CoreCreate${CLASS_NAME}Input {
  @Field(() => String)
  example: string;
}
EOF

# Make nest update input
cat <<EOF >> src/nest/modules/${FILE_NAME}/dto/update-${FILE_NAME}.input.ts
import { InputType, Field } from "@nestjs/graphql";
import { Create${CLASS_NAME}Input as CoreCreate${CLASS_NAME}Input } from "#${FILE_NAME}/app";

@InputType()
export class Update${CLASS_NAME}Input implements CoreCreate${CLASS_NAME}Input {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  example?: string;
}
EOF

# Make nest remove input
cat <<EOF >> src/nest/modules/${FILE_NAME}/dto/remove-${FILE_NAME}.input.ts
import { InputType, Field } from "@nestjs/graphql";
import { Remove${CLASS_NAME}Input as CoreRemove${CLASS_NAME}Input } from "#${FILE_NAME}/app";

@InputType()
export class Remove${CLASS_NAME}Input implements CoreRemove${CLASS_NAME}Input {
  @Field(() => String)
  id: string;
}
EOF

# Make nest module
cat <<EOF >> src/nest/modules/${FILE_NAME}/${FILE_NAME}.module.ts
import { Module } from "@nestjs/common";
import { ${CLASS_NAME}Facade } from "#${FILE_NAME}/app";
import { ${CLASS_NAME}FacadeFactory } from "#${FILE_NAME}/infra";

import { ${CLASS_NAME}Resolver } from "./${FILE_NAME}.resolver";

@Module({
  providers: [
    ${CLASS_NAME}Resolver,
    {
      provide: ${CLASS_NAME}Facade,
      useFactory: () => ${CLASS_NAME}FacadeFactory.create(),
    },
  ],
})
export class ${CLASS_NAME}Module {}
EOF

# Make nest resolver
cat <<EOF >> src/nest/modules/${FILE_NAME}/${FILE_NAME}.resolver.ts
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ${CLASS_NAME}Facade } from "#${FILE_NAME}/app";

import { Create${CLASS_NAME}Input } from "./dto/create-${FILE_NAME}.input";
import { Get${CLASS_NAME}Input } from "./dto/get-${FILE_NAME}.input";
import { ${CLASS_NAME}Output } from "./dto/${FILE_NAME}.output";
import { Update${CLASS_NAME}Input } from "./dto/update-${FILE_NAME}.input";
import { Remove${CLASS_NAME}Input } from "./dto/remove-${FILE_NAME}.input";

@Resolver()
export class ${CLASS_NAME}Resolver {
  constructor(private readonly ${VAR_NAME}Facade: ${CLASS_NAME}Facade) {}

  @Query(() => ${CLASS_NAME}Output)
  get${CLASS_NAME}(@Args("input") input: Get${CLASS_NAME}Input) {
    return this.${VAR_NAME}Facade.get${CLASS_NAME}(input);
  }

  @Mutation(() => ${CLASS_NAME}Output)
  create${CLASS_NAME}(@Args("input") input: Create${CLASS_NAME}Input) {
    return this.${VAR_NAME}Facade.create${CLASS_NAME}(input);
  }

  @Mutation(() => ${CLASS_NAME}Output)
  update${CLASS_NAME}(@Args("input") input: Update${CLASS_NAME}Input) {
    return this.${VAR_NAME}Facade.update${CLASS_NAME}(input);
  }

  @Mutation(() => ${CLASS_NAME}Output)
  remove${CLASS_NAME}(@Args("input") input: Remove${CLASS_NAME}Input) {
    return this.${VAR_NAME}Facade.remove${CLASS_NAME}(input);
  }
}
EOF

echo "Resource ${CLASS_NAME} created successfully"
CREATE="\033[0;32mCREATE\033[0m"
echo "$CREATE src/${FILE_NAME}/app/dto/${FILE_NAME}.output.ts"
echo "$CREATE src/${FILE_NAME}/app/dto/get-${FILE_NAME}.input.ts"
echo "$CREATE src/${FILE_NAME}/app/dto/create-${FILE_NAME}.input.ts"
echo "$CREATE src/${FILE_NAME}/app/dto/update-${FILE_NAME}.input.ts"
echo "$CREATE src/${FILE_NAME}/app/dto/remove-${FILE_NAME}.input.ts"
echo "$CREATE src/${FILE_NAME}/app/facade/${FILE_NAME}.facade.ts"
echo "$CREATE src/${FILE_NAME}/app/use-cases/get-${FILE_NAME}.use-case.ts"
echo "$CREATE src/${FILE_NAME}/app/use-cases/create-${FILE_NAME}.use-case.ts"
echo "$CREATE src/${FILE_NAME}/app/use-cases/update-${FILE_NAME}.use-case.ts"
echo "$CREATE src/${FILE_NAME}/app/use-cases/remove-${FILE_NAME}.use-case.ts"
echo "$CREATE src/${FILE_NAME}/domain/${FILE_NAME}.entity.ts"
echo "$CREATE src/${FILE_NAME}/infra/factory/${FILE_NAME}-facade.factory.ts"
echo "$CREATE src/${FILE_NAME}/infra/factory/${FILE_NAME}-in-memory-facade.factory.ts"
echo "$CREATE src/nest/modules/${FILE_NAME}/dto/get-${FILE_NAME}.input.ts"
echo "$CREATE src/nest/modules/${FILE_NAME}/dto/create-${FILE_NAME}.input.ts"
echo "$CREATE src/nest/modules/${FILE_NAME}/dto/update-${FILE_NAME}.input.ts"
echo "$CREATE src/nest/modules/${FILE_NAME}/dto/remove-${FILE_NAME}.input.ts"
echo "$CREATE src/nest/modules/${FILE_NAME}/${FILE_NAME}.module.ts"
echo "$CREATE src/nest/modules/${FILE_NAME}/${FILE_NAME}.resolver.ts"