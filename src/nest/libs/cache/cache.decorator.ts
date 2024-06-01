import 'reflect-metadata';
import { Inject } from '@nestjs/common';

import { CacheService } from './cache.service';

export type CacheOptions = {
  ttl: number;
};

export enum ReturnType {
  PROMISE = 'Promise',
  SCALAR = 'Scalar',
}

export function Cache(options?: CacheOptions): MethodDecorator {
  const injectCache = Inject(CacheService);
  return (target, methodName: string, descriptor: PropertyDescriptor) => {
    injectCache(target, 'cacheService');

    const originalMethod = descriptor.value;
    const className = target.constructor.name;

    descriptor.value = async function (...args: unknown[]) {
      const cacheKey = `${className}:${methodName}:${args
        .map((a) => JSON.stringify(a))
        .join()}`;

      const entry = await this.cacheService.get(cacheKey);
      if (entry) {
        return entry;
      }

      const response = originalMethod.apply(this, args);
      const result = response instanceof Promise ? await response : response;
      await this.cacheService.set(cacheKey, result, options?.ttl);

      return result;
    };

    return descriptor;
  };
}
