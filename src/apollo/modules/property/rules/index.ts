import { chain, generic } from "nexus-shield";

import { hasScope, isAuthenticated } from "../../shared/rules";

export const canCreateProperty = generic(
  chain(isAuthenticated, hasScope("create:property"))
);

export const canReadProperty = generic(chain());

export const canSearchProperty = generic(chain());

export const canUpdateProperty = generic(
  chain(isAuthenticated, hasScope("update:property"))
);

export const canDeleteProperty = generic(
  chain(isAuthenticated, hasScope("delete:property"))
);
