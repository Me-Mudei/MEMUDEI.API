import { registerEnumType } from "@nestjs/graphql";
import { PropertyStatus, PropertyType, DetailType } from "#property/domain";

export { PropertyStatus, PropertyType, DetailType } from "#property/domain";

registerEnumType(PropertyStatus, { name: "PropertyStatus" });
registerEnumType(PropertyType, { name: "PropertyType" });
registerEnumType(DetailType, { name: "DetailType" });
