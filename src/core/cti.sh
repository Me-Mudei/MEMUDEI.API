#!/bin/sh

npm run cti create './src/core/shared/application' -- -i '*spec.ts' -b && 
npm run cti create './src/core/shared/domain' -- -i '*spec.ts' -e 'tests' -b && 
npm run cti create './src/core/shared/infra' -- -i '*spec.ts' -b && 

npm run cti create './src/core/user/application' -- -i '*spec.ts' -b && 
npm run cti create './src/core/user/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/core/user/infra' -- -i '*spec.ts' -b