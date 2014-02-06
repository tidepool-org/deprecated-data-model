#!/bin/bash


echo "Setting up travis"
git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
GIT_URL=${GH_TOKEN}@github.com:${TRAVIS_REPO_SLUG}.git
git config remote.origin.url ${GIT_URL}

