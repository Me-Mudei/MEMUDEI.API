import { Module } from "@nestjs/common";
import { PropertyFacade } from "#property/app";
import { PropertyFacadeFactory } from "#property/infra";

import { PropertyResolver } from "./property.resolver";

@Module({
  providers: [
    PropertyResolver,
    {
      provide: PropertyFacade,
      useFactory: () => PropertyFacadeFactory.create(),
    },
  ],
})
export class PropertyModule {}
