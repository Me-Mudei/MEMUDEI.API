import { registerEnumType } from '@nestjs/graphql';
export enum PropertyStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  PUBLISHED = 'published',
  REJECTED = 'rejected',
  UNPUBLISHED = 'unpublished',
  DEACTIVATE = 'deactivated',
}

registerEnumType(PropertyStatus, { name: 'PropertyStatus' });
