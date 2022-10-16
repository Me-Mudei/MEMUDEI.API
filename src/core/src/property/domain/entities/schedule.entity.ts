import { Entity, UniqueEntityId } from '../../../shared/domain';

export type ScheduleProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class Schedule extends Entity<ScheduleProps> {
  constructor(props: ScheduleProps) {
    super(props);
  }
}
