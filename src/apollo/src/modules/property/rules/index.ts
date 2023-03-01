import { hasScope, isAuthenticated } from '../../shared/rules';
import { chain, generic } from 'nexus-shield';

export const canCreateProperty = generic(
  chain(isAuthenticated, hasScope('property:create')),
);

export const canReadProperty = generic(chain());

export const canSearchProperty = generic(chain());

export const canWriteProperty = generic(
  chain(isAuthenticated, hasScope('property:write')),
);

export const canDeleteProperty = generic(
  chain(isAuthenticated, hasScope('property:delete')),
);
