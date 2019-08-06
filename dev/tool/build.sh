#!/usr/bin/env sh

set -eu

# Cleanup
rm -f teleprint.js

node dev/tool/include.js

if [ "${1:-}" != "test" ]; then
	# Minify the build
	node_modules/.bin/uglifyjs --config-file dev/cfg/uglify.json \
	teleprint.js > teleprint.min.js

	CONTENT=$(cat teleprint.min.js)
	rm -rf teleprint.js teleprint.min.js
else
	CONTENT=$(cat teleprint.js)
	rm -rf teleprint.js
fi

# Prepend package information to the distribution
PACKAGE_JSON="require('./package.json')"
YEAR=$(date +"%Y")
AUTHOR="$(node -p -e ${PACKAGE_JSON}.author)"
COPYRIGHT="${YEAR} ${AUTHOR}"
NAME="$(node -p -e ${PACKAGE_JSON}.name)"
DESCRIPTION="$(node -p -e ${PACKAGE_JSON}.description)"
LICENSE="$(node -p -e ${PACKAGE_JSON}.license)"
VERSION="$(node -p -e ${PACKAGE_JSON}.version)"

echo "// ${NAME} v${VERSION} | ${DESCRIPTION}" > teleprint.js
echo "// Copyright (c) ${COPYRIGHT}" >> teleprint.js
echo "// Distributed under the ${LICENSE} license" >> teleprint.js
echo "${CONTENT}" >> teleprint.js
