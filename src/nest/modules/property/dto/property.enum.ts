import { PropertyStatus } from '#property/domain';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(PropertyStatus, { name: 'PropertyStatus' });
