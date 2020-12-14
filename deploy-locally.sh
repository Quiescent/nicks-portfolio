#!/usr/bin/env bash

set -e

ROOT_DIR=

if [ "$(uname)" = "Darwin" ]; then
    ROOT_DIR=/Library/WebServer/Documents/
    COMMAND="sudo"
fi

if [ "$(uname)" = "Linux" ]; then
    ROOT_DIR=/var/www/htdocs/
    COMMAND="su -c"
fi

if [ -z "${ROOT_DIR}" ]; then
    echo "Could not detect operating system: ($(uname))"
    exit 1
fi

"$COMMAND" rm -rf "$ROOT_DIR*" && \
    "$COMMAND" cp -r css "$ROOT_DIR" && \
    "$COMMAND" cp -r img "$ROOT_DIR" && \
    "$COMMAND" cp -r js "$ROOT_DIR" && \
    "$COMMAND" cp -r fonts "$ROOT_DIR" && \
    "$COMMAND" cp *.html "$ROOT_DIR" && \
    "$COMMAND" cp *.json "$ROOT_DIR"
