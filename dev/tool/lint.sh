#!/usr/bin/env sh

set -eu

# Node + ES6
node_modules/.bin/eslint -c .eslintrc.js \
--fix test/ dev/tool/

# ES5
node_modules/.bin/eslint -c src/.eslintrc.js \
--fix src/
