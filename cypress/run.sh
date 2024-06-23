#!/bin/bash

# create cache for repeat runs
mkdir -p /workdir/cypress_cache
ln -s /workdir/cypress_cache /root/.cache

yarn --frozen-lockfile
# run the tests
yarn cypress:runRbac
yarn cypress:runGeneral
yarn cypress:runOrganizations