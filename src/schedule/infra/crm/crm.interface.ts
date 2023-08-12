export interface Crm {
  createUser(user: any): Promise<{ id: string }>;
  deleteUser(id: string): Promise<void>;
  createProperty(property: any): Promise<{ id: string }>;
  deleteProperty(name: string): Promise<void>;
  //createSchedule(schedule: any): Promise<void>;
  //deleteSchedule(id: string): Promise<void>;
  //validateSchedule(props: any): Promise<void>;
}
