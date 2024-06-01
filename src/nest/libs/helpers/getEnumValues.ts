export const getEnumValues = <T extends object>(enumType: T): Array<string> => {
  return [
    ...new Set(
      Object.entries(enumType)
        .filter(([key]) => !~~key)
        .flatMap((item) => item),
    ),
  ] as string[];
};
