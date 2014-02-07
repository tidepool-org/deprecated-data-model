#!/bin/bash

if [[ "$TRAVIS" == "true" ]] ; then
  echo "$TRAVIS_BRANCH from $TRAVIS_REPO_SLUG"
  if [[ "$TRAVIS_REPO_SLUG" == "tidepool-org/data-model" ]] ; then
    if [[ "$TRAVIS_BRANCH" != "master" ]] ; then
      echo "gh-pages should only update from master"
      exit 0;
    fi
  else
    echo "only origin should update gh-pages"
    exit 0;
  fi

fi
echo "push build results to gh-pages"
(cd web/
  git status
  yes | git push -q origin gh-pages 2>&1 > /dev/null) || echo "oops"

