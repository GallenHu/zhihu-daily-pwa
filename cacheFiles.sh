#!/bin/bash
# generate cacheFiles path in production env

# copy file
cp ./service-worker.js ./docs/service-worker.js
cp ./manifest.json ./docs/manifest.json

getFiles(){
    files=$(ls $1)
    for filename in $files
    do
       echo $filename
    done
}

echo -e "\nCachefiles:\n"

getFiles './docs/static/css/*'| sed "s/.\/docs\//'.\//"|sed "s/$/',/g"
getFiles './docs/static/img/*'| sed "s/.\/docs\//'.\//"|sed "s/$/',/g"
getFiles './docs/static/js/*'| sed "s/.\/docs\//'.\//"|sed "s/$/',/g"

echo -e "\nPlease Replace Those Cachefiles Manually.\n"
