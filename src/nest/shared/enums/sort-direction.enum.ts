import { registerEnumType } from "@nestjs/graphql";

export type SortDirection = "asc" | "desc";

export const SortDirection = {
  ASC: "asc",
  DESC: "desc",
};

registerEnumType(SortDirection, { name: "SortDirection" });
