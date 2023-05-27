import { hasScope, isAuthenticated } from '../../shared/rules';
import { chain, generic } from 'nexus-shield';

export const canCreateProperty = generic(
  chain(isAuthenticated, hasScope('create:property')),
);

export const canReadProperty = generic(chain());

export const canSearchProperty = generic(chain());

export const canUpdateProperty = generic(
  chain(isAuthenticated, hasScope('update:property')),
);

export const canDeleteProperty = generic(
  chain(isAuthenticated, hasScope('delete:property')),
);
