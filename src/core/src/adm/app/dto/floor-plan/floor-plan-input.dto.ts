export type CreateFloorPlanInput = {
  key: string;
  name: string;
  unit?: string;
};

export type UpdateFloorPlanInput = {
  key: string;
  name?: string;
  unit?: string;
};
