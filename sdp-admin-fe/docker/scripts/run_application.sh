#!/bin/sh

ENV=${ENV:-development}
echo "SET UP ADMIN FE CONFIGURATION FOR ENV: $ENV"

if [ -f "/opt/config/app.config.${ENV}.js" ]; then
    echo " - Applying app.config.${ENV}.js configuration"
    cp "/opt/config/app.config.${ENV}.js" /usr/share/nginx/html/app.config.js
else
    echo "Config file for environment '${ENV}' not found."
fi
echo

echo "Starting nginx... [sdp-admin-fe]"
nginx -g "daemon off;"
