#!/usr/bin/env sh

set -eu

npm run lint
npm run build 'test'

node_modules/.bin/karma start dev/cfg/karma.js
