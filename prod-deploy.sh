#!/bin/sh

. ./.env
. ./change-service-name.sh

docker compose up -d $PROD_SERVICE_NAME