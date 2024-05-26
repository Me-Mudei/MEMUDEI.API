import { configEnv } from "#shared/infra";
import { caching, Cache, Store, memoryStore } from "cache-manager";
import { redisStore } from "cache-manager-redis-yet";

export class CacheManager {
  private client: Cache;

  constructor(client: Cache) {
    this.client = client;
  }

  static async create() {
    const config = {
      ttl: 60 * 60 * 24,
      max: 100,
    };
    let store: Store = memoryStore(config);
    if (configEnv.cache.vendor === "REDIS") {
      store = await redisStore({
        url: configEnv.cache.url,
        ...config,
      });
    }
    const client = await caching(store);

    return new CacheManager(client);
  }

  async get(key: string): Promise<unknown> {
    return this.client.get(key);
  }
  set(key: string, value: unknown, ttl: number): Promise<unknown> {
    return this.client.set(key, value, ttl);
  }
  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
