#!/usr/bin/env sh

set -eu

if [ "${1}" = "--commit" ]; then
    tmp_docs=$(mktemp -d)
    doc_timestamp=$(date +%Y-%m-%dT%H:%M:%S%z)

    ./dev/tool/doc.sh --create

    echo "Commiting the documentation..."

    mv docs ${tmp_docs}/

    git checkout gh-pages

    rm -rf *
    mv ${tmp_docs}/docs/* ./

    git add *
    git commit -am "doc: generated on '${doc_timestamp}'"

elif [ "${1}" = "--create" ]; then
    echo "Creating the documentation..."

    npm i

    # Custom styles and templates
    mkdir -p docs/styles

    cat dev/cfg/jsdoc/container.tmpl > node_modules/docdash/tmpl/container.tmpl
    cat dev/cfg/jsdoc/layout.tmpl > node_modules/docdash/tmpl/layout.tmpl
    cat dev/cfg/jsdoc/method.tmpl > node_modules/docdash/tmpl/method.tmpl

    cp dev/cfg/jsdoc/jsdoc.teleprint.css docs/styles/

    # Generate the documentation
    node node_modules/jsdoc/jsdoc.js -r -c \
    dev/cfg/jsdoc/jsdoc.json src/module.js src/component/
fi
