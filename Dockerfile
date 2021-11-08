# base image

FROM nginx:latest

WORKDIR /app
# MAKE SURE TO RUN NPM RUN BUILD BEFORE CREATING THIS DOCKERFILE
COPY web/dist /app/dist

# copy files for nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/nginx-ssl.conf /etc/nginx/nginx-ssl.conf
COPY nginx/mime.types /etc/nginx/mime.types

# copy cert files
WORKDIR /app/certs
COPY nginx/wildcard.hailtechno.com.crt /app/certs/cert.crt
COPY nginx/wildcard.hailtechno.com.rsa /app/certs/cert.rsa

WORKDIR /app

# start app
EXPOSE 80 443

