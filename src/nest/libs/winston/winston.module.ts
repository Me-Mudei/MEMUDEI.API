import { DynamicModule, Module } from "@nestjs/common";
import {
  WinstonModule as NestWinstonModule,
  WinstonModuleOptions,
  utilities,
} from "nest-winston";
import winston from "winston";

@Module({})
export class WinstonModule extends NestWinstonModule {
  static forRoot(options: WinstonModuleOptions = {}): DynamicModule {
    return super.forRoot({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike("Memudei", {
              colors: true,
              prettyPrint: true,
            })
          ),
        }),
      ],
      ...options,
    });
  }
}
