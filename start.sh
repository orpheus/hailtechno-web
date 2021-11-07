#!/usr/bin/env bash
#export NODE_OPTIONS=--max_old_space_size=8192

#If NODE_ENV is set to "development" do dev build, otherwise default to prod
if [ ! -z "$NODE_ENV" ] && [ "$NODE_ENV" == "development" ]
then
	echo "Build dev"
	npm run build:dev
else
	echo "Build prod"
	npm run build:prod
fi

#rm -r src webpack* package* node* public config babel* bin __*
#Ideally we will clean up after the build, but currently this prevents restarting a container since it builds each time.

nginx -c "/app/nginx/nginx.conf" -g "daemon off;"
