import { hasScope, isAdvertiser, isAuthenticated } from '../../shared/rules';
import { chain, generic, not } from 'nexus-shield';

export const canCreateProperty = generic(
  chain(isAuthenticated, hasScope('property:create'), not(isAdvertiser)),
);

export const canReadProperty = generic(chain());

export const canSearchProperty = generic(chain());

export const canWriteProperty = generic(
  chain(isAuthenticated, hasScope('property:write'), not(isAdvertiser)),
);

export const canDeleteProperty = generic(
  chain(isAuthenticated, hasScope('property:delete'), not(isAdvertiser)),
);
