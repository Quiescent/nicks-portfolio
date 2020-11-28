#!/bin/env bash

su -c 'rm -rf /var/www/htdocs/*; \
  cp -r css/ /var/www/htdocs/; \
  cp -r img/ /var/www/htdocs/; \
  cp -r js/ /var/www/htdocs/; \
  cp -r fonts/ /var/www/htdocs/; \
  cp *.html /var/www/htdocs/; \
  cp *.json /var/www/htdocs/'
