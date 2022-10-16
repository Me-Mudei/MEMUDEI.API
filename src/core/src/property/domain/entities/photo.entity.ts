import { Entity, UniqueEntityId } from '../../../shared/domain';

export type PhotoProps = {
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
};

export class Photo extends Entity<PhotoProps> {
  constructor(props: PhotoProps) {
    super(props);
  }
}
