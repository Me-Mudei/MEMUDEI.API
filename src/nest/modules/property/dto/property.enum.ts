import { PropertyStatus } from "#property/domain";
import { registerEnumType } from "@nestjs/graphql";

export { PropertyStatus } from "#property/domain";

registerEnumType(PropertyStatus, { name: "PropertyStatus" });
