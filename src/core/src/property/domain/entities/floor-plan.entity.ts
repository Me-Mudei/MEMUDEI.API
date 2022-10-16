import { Entity, UniqueEntityId } from '../../../shared/domain';

export type FloorPlanProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class FloorPlan extends Entity<FloorPlanProps> {
  constructor(props: FloorPlanProps) {
    super(props);
  }
}
