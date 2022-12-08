#!/bin/sh

MAC_OS="darwin-amd64"
LINUX_OS="linux-amd64"
ARCH=$(echo "$(uname -s|tr '[:upper:]' '[:lower:]'|sed 's/mingw64_nt.*/windows/')-$(uname -m |sed 's/x86_64/amd64/g')" |sed 's/darwin-arm64/darwin-amd64/g')

. ./.env


if [ "$ARCH" = "$MAC_OS" ];
then
    sed -i "" "s/DEV_SERVICE_NAME/${DEV_SERVICE_NAME}/g" "./docker-compose.yaml"
    sed -i "" "s/PROD_SERVICE_NAME/${PROD_SERVICE_NAME}/g" "./docker-compose.yaml"
else
    sed -i "s/DEV_SERVICE_NAME/${DEV_SERVICE_NAME}/g" "./docker-compose.yaml"
    sed -i "s/PROD_SERVICE_NAME/${PROD_SERVICE_NAME}/g" "./docker-compose.yaml"
fi

