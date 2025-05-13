import { registerEnumType } from "@nestjs/graphql";
import { OrgRole } from "#merchant/domain";

export { OrgRole } from "#merchant/domain";

registerEnumType(OrgRole, { name: "OrgRole" });
