#!/bin/bash
# generate cacheFiles path in production env
getFiles(){
    files=$(ls $1)
    for filename in $files
    do
       echo $filename
    done
}

getFiles './dist/static/css/*'| sed "s/.\/dist\/static\//'.\//"|sed "s/$/',/g"
getFiles './dist/static/img/*'| sed "s/.\/dist\/static\//'.\//"|sed "s/$/',/g"
getFiles './dist/static/js/*'| sed "s/.\/dist\/static\//'.\//"|sed "s/$/',/g"
