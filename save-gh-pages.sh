#!/bin/bash

# add everything
echo "add build results to gh-pages"
cd web/
if [[ "$TRAVIS" == "true" ]] ; then
  ../travis-setup.sh
fi
rm clean
git add .
git commit -avm "AUTOMATIC gh-pages BUILD $(date +%F)"

