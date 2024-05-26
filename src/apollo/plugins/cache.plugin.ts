import { plugin } from "nexus";
import { printedGenTyping } from "nexus/dist/utils";

const FieldCacheType = printedGenTyping({
  optional: true,
  name: "cache",
  description: `
    Cache the result of this field in the cache service
  `,
  type: "Boolean",
});

const ObjectTypeFieldCacheType = printedGenTyping({
  optional: true,
  name: "cache",
  description: `
    Default cache configuration for all fields in this object type
  `,
  type: "Boolean",
});

export const cachePlugin = plugin({
  name: "Nexus Cache Plugin",
  fieldDefTypes: FieldCacheType,
  objectTypeDefTypes: ObjectTypeFieldCacheType,
  onCreateFieldResolver(config) {
    const object = config.parentTypeConfig.extensions?.nexus?.config.cache;
    const field = config.fieldConfig.extensions?.nexus?.config.cache;

    return async (root, args, ctx, info, next) => {
      if (field === false || (object === false && field !== true)) {
        return next(root, args, ctx, info);
      }
      const cacheService = ctx.cacheService;
      const cacheKey = `${config.fieldConfig.name}:${JSON.stringify(
        config.fieldConfig.args
      )}`;
      const cacheValue = await cacheService.get(cacheKey);
      if (cacheValue) {
        return JSON.parse(cacheValue);
      }
      const result = await next(root, args, ctx, info);
      cacheService.set(cacheKey, JSON.stringify(result));
      return result;
    };
  },
});
