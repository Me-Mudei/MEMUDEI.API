import Entity from "@core/src/@shared/domain/entity/entity";
import UniqueEntityId from "@core/src/@shared/domain/value-objects/unique-entity-id.vo";

export type LocationProps = {
  longitude: string;
  latitude: string;
};

export default class Location extends Entity<LocationProps> {
  constructor(props: LocationProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
