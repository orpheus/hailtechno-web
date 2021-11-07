#!/bin/bash
if [ "$#" -ne 1 ]; then
  echo "Usage: build_run_payment-web.sh [NETWORK_NAME]"
fi

NETWORK_NAME=$1
SERVICE_NAME=payment-web
IMAGE=paymentweb:dev
NODE_ENV=development
PAY_INVOICE_API_HOST=http://localhost
PAY_INVOICE_API_PORT=4100

docker build --tag $IMAGE .
docker container ls

docker run -it -d -p 4500:80 -p 4543:443 --network $NETWORK_NAME \
    --env NODE_ENV=$NODE_ENV \
    --env ENV_MAIN=.env.payFullDocker \
    --env PAYMENTS_SERVICE_HOST=$PAY_INVOICE_API_HOST \
    --env PAYMENTS_SERVICE_PORT=$PAY_INVOICE_API_PORT \
    --name $SERVICE_NAME \
    $IMAGE
