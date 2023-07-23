import { chain, generic } from "nexus-shield";

import { hasScope, isAuthenticated } from "../../shared/rules";

export const canCreateUser = generic(
  chain(isAuthenticated, hasScope("create:user"))
);

export const canSearchUser = generic(
  chain(isAuthenticated, hasScope("read:user"))
);
