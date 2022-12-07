#!/bin/sh

. ./.env
. ./change-service-name.sh

docker compose up -d $DEV_SERVICE_NAME