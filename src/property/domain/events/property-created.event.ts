import { DomainEvent } from "#shared/infra";

import { Property } from "../entities";

export class PropertyCreated implements DomainEvent {
  name = "PropertyCreated";

  constructor(readonly property: Property) {}
}
