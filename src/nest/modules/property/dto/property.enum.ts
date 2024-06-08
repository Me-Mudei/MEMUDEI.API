import { registerEnumType } from "@nestjs/graphql";
import { PropertyStatus } from "#property/domain";

export { PropertyStatus } from "#property/domain";

registerEnumType(PropertyStatus, { name: "PropertyStatus" });
