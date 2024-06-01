import { DynamicModule, Module } from "@nestjs/common";
import {
  ConfigModule as NestConfigModule,
  ConfigModuleOptions,
} from "@nestjs/config";
import { join } from "path";

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    const { envFilePath, ...otherOptions } = options;
    const filePath = Array.isArray(envFilePath)
      ? envFilePath
      : [envFilePath ?? ""];
    return super.forRoot({
      isGlobal: true,
      envFilePath: [
        ...filePath,
        join(__dirname, `../../../.env.${process.env.NODE_ENV}`),
        join(__dirname, `../../../.env`),
      ],
      ...otherOptions,
    });
  }
}
