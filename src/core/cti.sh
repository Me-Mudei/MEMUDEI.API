#!/bin/sh

npm run cti create './src/shared/app' -- -i '*spec.ts' -b && 
npm run cti create './src/shared/domain' -- -i '*spec.ts' -e 'tests' -b && 
npm run cti create './src/shared/infra' -- -i '*spec.ts' -b && 

npm run cti create './src/user/app' -- -i '*spec.ts' -b && 
npm run cti create './src/user/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/user/infra' -- -i '*spec.ts' -b