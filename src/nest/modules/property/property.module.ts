import { Module } from '@nestjs/common';
import { PropertyResolver } from './property.resolver';
import { SearchPropertiesResolver } from './search-properties.resolver';
import { PropertyFacade } from '#property/app';
import { PropertyFacadeFactory } from '#property/infra';

@Module({
  providers: [
    PropertyResolver,
    SearchPropertiesResolver,
    {
      provide: PropertyFacade,
      useFactory: () => PropertyFacadeFactory.create(),
    },
  ],
})
export class PropertyModule {}
