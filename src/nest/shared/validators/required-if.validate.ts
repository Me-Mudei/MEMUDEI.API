/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export const RequiredIf = (
  fields: string[],
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'requiredIf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [fields],
      options: {
        message:
          validationOptions?.message ??
          `${propertyName} is required if ${fields.join(', ')}`,
        ...validationOptions,
      },
      validator: {
        validate(_value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const object = args.object as any;
          const propertyIsNotEmpty = !!object[propertyName];
          let propertyCount = 0;
          for (const prop of relatedPropertyName) {
            if (object[prop] && !propertyIsNotEmpty) {
              propertyCount++;
            }
          }
          return propertyCount === 0;
        },
      },
    });
  };
};
