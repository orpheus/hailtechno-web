#!/usr/bin/env bash

echo $gitlab_gcp_id_rsa_base64 | base64 --decode > gitlab_gcp_id_rsa
chmod 600 gitlab_gcp_id_rsa

#Static variables to describe the specific service
SERVICE_NAME=payments-web
NETWORK_NAME=dev
if [ $PROFILE == "zmb-test" ]
then
  NETWORK_NAME=pay-zmb-ussd-test
fi


IMAGE=$CONTAINER_TEST_IMAGE

#Variables passed to configure environments
echo "DEPLOY_TARGET_IP: ${DEPLOY_TARGET_IP}"
echo "PROFILE: ${PROFILE}"
echo "CI_JOB_TOKEN: ${CI_JOB_TOKEN}"
echo "CI_REGISTRY: ${CI_REGISTRY}"
echo "IMAGE: ${IMAGE}"
echo "SERVICE_NAME: ${SERVICE_NAME}"
echo "NETWORK_NAME: ${NETWORK_NAME}"
echo "PAY_INVOICE_API_HOST: ${PAY_INVOICE_API_HOST}"
echo "PAY_INVOICE_API_PORT: ${PAY_INVOICE_API_PORT}"

set -ex

#SSH and run the scripts
ssh -i gitlab_gcp_id_rsa -o SendEnv=$CI_JOB_TOKEN -o SendEnv=$CI_REGISTRY -o StrictHostKeyChecking=no gitlab_gcp@${DEPLOY_TARGET_IP} "bash -s" << EOF
    sudo docker login -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY

    sudo docker network create ${NETWORK_NAME}

    #Stop any existing instances of the service and remove their docker images
    sudo docker stop $SERVICE_NAME
    sudo docker rm $SERVICE_NAME
    sudo docker container rm $SERVICE_NAME
    sudo docker rmi $IMAGE
    sudo docker run -it -d -p 5000:80 -p 5443:443 --network $NETWORK_NAME --env NODE_ENV=$NODE_ENV --env ENV_MAIN=$ENV_MAIN --env PAYMENTS_SERVICE_HOST=$PAY_INVOICE_API_HOST --env PAYMENTS_SERVICE_PORT=$PAY_INVOICE_API_PORT --env CI_COMMIT_SHORT_SHA=$CI_COMMIT_SHORT_SHA --name $SERVICE_NAME $IMAGE
EOF

