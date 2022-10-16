import { Entity, UniqueEntityId } from '../../../shared/domain';

export type ReportProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class Report extends Entity<ReportProps> {
  constructor(props: ReportProps) {
    super(props);
  }
}
