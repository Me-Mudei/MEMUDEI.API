import { registerEnumType } from "@nestjs/graphql";
import { SortDirection } from "#shared/domain";
export { SortDirection };

registerEnumType(SortDirection, { name: "SortDirection" });
