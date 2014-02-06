#!/bin/bash

# remove everything from
(cd web/
git status
git pull gh-pages
git status
git rm -r .
touch clean
)

