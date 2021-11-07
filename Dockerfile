# base image
FROM node:lts

# Install nginx to serve the content
RUN apt-get update && \
apt-get -y install nginx \
&& apt-get -y install libglu1

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ARG DEPLOY_ENV

# install and cache app dependencies
COPY web/.npmrc /app/.npmrc
COPY web/package.json /app/package.json
COPY web/package-lock.json /app/package-lock.json
COPY start.sh /app/start.sh

RUN npm ci
COPY web/ /app

# copy files for nginx
COPY deployments/nginx/nginx.conf /app/nginx/nginx.conf
COPY deployments/nginx/nginx-ssl.conf /app/nginx/nginx-ssl.conf
COPY deployments/nginx/mime.types /app/nginx/mime.types

# copy cert files
RUN mkdir /app/certs
COPY deployments/nginx/wildcard.hailtechno.com.crt /app/certs/cert.crt
COPY deployments/nginx/wildcard.hailtechno.com.rsa /app/certs/cert.rsa

# start app
EXPOSE 80 443
CMD ["/bin/bash", "start.sh"]

