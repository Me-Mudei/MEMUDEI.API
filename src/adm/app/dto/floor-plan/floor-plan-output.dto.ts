import { FloorPlan } from "../../../domain";

export type FloorPlanOutput = {
  id: string;
  key: string;
  name: string;
  unit?: string;
  created_at: Date;
  updated_at: Date;
};

export class FloorPlanOutputMapper {
  static toOutput(entity: FloorPlan): FloorPlanOutput {
    return entity.toJSON();
  }
}
