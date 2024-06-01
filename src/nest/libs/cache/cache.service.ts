import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  public get(key: string): Promise<unknown> {
    return this.cache.get(key);
  }

  public set(key: string, value: unknown, ttl: number): Promise<unknown> {
    return this.cache.set(key, value, ttl);
  }

  public del(key: string): Promise<void> {
    return this.cache.del(key);
  }
}
