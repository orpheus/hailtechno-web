#!/bin/bash

dbuild() {
  cd web
  rm -r dist/
  npm run build:dev
  cd ..
  docker build . -t hailtechno/hailtechno-web:latest
}

drun() {
  docker run -p 8080:80 -p 443:443 hailtechno/hailtechno-web:latest
}

ddeploy() {
  kubectl delete deployment hailtechno-web
  kubectl apply -k deployments/templates
}