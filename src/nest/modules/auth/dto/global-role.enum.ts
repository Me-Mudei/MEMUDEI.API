import { registerEnumType } from "@nestjs/graphql";
import { GlobalRole } from "#auth/domain";

export { GlobalRole } from "#auth/domain";

registerEnumType(GlobalRole, { name: "GlobalRole" });
