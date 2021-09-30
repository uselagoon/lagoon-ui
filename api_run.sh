#!/bin/sh

if [ -d "/services/api/src" ]; then 
    echo 'Local services api src exists, no copy needed'
    rm -rf /app/services/api/src
    ln -sfv /services/api/src /app/services/api/src
else 
    echo 'Does not exist'
    cp -R /app/services/api/src /services/api
    rm -rf /app/services/api/src
    ln -sfv /services/api/src /app/services/api/src
fi

exec "$@"