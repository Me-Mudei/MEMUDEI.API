/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationArguments, registerDecorator } from 'class-validator';

type MutuallyExclusiveOptions = {
  nullable?: boolean;
};
export const MutuallyExclusive = (
  fields: string[],
  options?: MutuallyExclusiveOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'mutuallyExclusive',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [fields],
      options: {
        message: `${propertyName} is mutually exclusive with ${fields.join(
          ', ',
        )}`,
      },
      validator: {
        validate(_value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const object = args.object as any;
          let propertyCount = 0;
          if (object[propertyName]) {
            propertyCount++;
          }
          for (const prop of relatedPropertyName) {
            if (object[prop]) {
              propertyCount++;
            }
          }
          return options?.nullable ? propertyCount <= 1 : propertyCount === 1;
        },
      },
    });
  };
};
