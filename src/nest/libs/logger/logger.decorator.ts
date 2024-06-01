import { Inject, Logger } from "@nestjs/common";

export const Log = (): MethodDecorator => {
  const injectLogger = Inject(Logger);

  return (target, key, descriptor: PropertyDescriptor) => {
    injectLogger(target, "logger");

    const originalMethod = descriptor.value;

    const newDescriptor = async function (...args: unknown[]) {
      const logger: Logger = this.logger;

      const value = await originalMethod.apply(this, args);

      logger.log(
        `${String(key)} \n ${JSON.stringify({
          parameters: args,
          return: value,
        })}`,
        target.constructor.name
      );

      return value;
    };

    descriptor.value = newDescriptor;

    return descriptor;
  };
};
