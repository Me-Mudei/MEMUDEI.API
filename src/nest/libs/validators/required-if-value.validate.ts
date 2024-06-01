/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export const RequiredIfValue = (
  field: string,
  value: any,
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'requiredIfValue',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [field, value],
      options: {
        message:
          validationOptions?.message ??
          `${propertyName} is required if ${field} is ${
            typeof value === 'object' ? JSON.stringify(value) : value
          }`,
        ...validationOptions,
      },
      validator: {
        validate(_value: any, args: ValidationArguments) {
          const [relatedPropertyName, relatedPropertyValue] = args.constraints;

          const object = args.object as any;

          if (
            object[relatedPropertyName] === relatedPropertyValue &&
            !object[propertyName]
          ) {
            return false;
          }

          return true;
        },
      },
    });
  };
};
