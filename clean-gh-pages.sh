#!/bin/bash

# remove everything from
(cd web/
git status
git rm -r .
touch clean
)

