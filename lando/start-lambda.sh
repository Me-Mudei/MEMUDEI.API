#!/bin/bash

printenv | grep PATH
sleep 10
export NODE_PATH=$(npm root -g)
printenv | grep NODE_PATH
cd /app
exec  /var/www/.npm-global/bin/nodemon --delay 1000ms --legacy-watch --watch /opt/lando --watch /app -e js,json,ts -x '/usr/local/bin/node --inspect=0.0.0.0  /opt/lando/start-lambda.js || /usr/bin/touch /opt/lando/start-lambda.js'
