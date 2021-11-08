# base image

FROM nginx:latest

WORKDIR /app
COPY web/dist /app/dist

# copy files for nginx
COPY deployments/nginx/nginx.conf /etc/nginx/nginx.conf
COPY deployments/nginx/nginx-ssl.conf /etc/nginx/nginx-ssl.conf
COPY deployments/nginx/mime.types /etc/nginx/mime.types

# copy cert files
WORKDIR /app/certs
COPY deployments/nginx/wildcard.hailtechno.com.crt /app/certs/cert.crt
COPY deployments/nginx/wildcard.hailtechno.com.rsa /app/certs/cert.rsa

WORKDIR /app

# start app
EXPOSE 80 443

