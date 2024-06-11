import { Module } from "@nestjs/common";
import {
  PropertyAddressFacade,
  PropertyDetailFacade,
  PropertyFacade,
  PropertyMediaFacade,
} from "#property/app";
import {
  PropertyDetailFacadeFactory,
  PropertyFacadeFactory,
  PropertyMediaFacadeFactory,
  PropertyAddressFacadeFactory,
} from "#property/infra";

import { PropertyResolver } from "./property.resolver";

@Module({
  providers: [
    PropertyResolver,
    {
      provide: PropertyFacade,
      useFactory: () => PropertyFacadeFactory.create(),
    },
    {
      provide: PropertyDetailFacade,
      useFactory: () => PropertyDetailFacadeFactory.create(),
    },
    {
      provide: PropertyMediaFacade,
      useFactory: () => PropertyMediaFacadeFactory.create(),
    },
    {
      provide: PropertyAddressFacade,
      useFactory: () => PropertyAddressFacadeFactory.create(),
    },
  ],
})
export class PropertyModule {}
