#!/bin/bash

printenv | grep PATH
sleep 10
export NGROK_URL="$(curl http://ngrok:4551/api/tunnels | /usr/bin/jq .tunnels[0].public_url -r)"
printenv | grep NGROK_URL
export NODE_PATH=$(npm root -g)
printenv | grep NODE_PATH
cd /app
exec  /var/www/.npm-global/bin/nodemon --delay 1000ms --legacy-watch --watch /opt/lando --watch /app -x '/usr/local/bin/node --inspect=0.0.0.0  /opt/lando/start-lambda-proxy.js || /usr/bin/touch /opt/lando/start-lambda-proxy.js'
