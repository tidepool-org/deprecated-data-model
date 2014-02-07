#!/bin/bash

echo "$TRAVIS_BRANCH from $TRAVIS_REPO_SLUG"
if [[ -n "$TRAVIS" && "$TRAVIS_REPO_SLUG" != "tidepool-org/data-model" && "$TRAVIS_BRANCH" != "master" ]]; then
echo $TRAVIS_BRANCH should not update gh-pages, only master
exit 0;

fi
echo "push build results to gh-pages"
(cd web/
  git status
  yes | git push -q origin gh-pages 2>&1 > /dev/null) || echo "oops"

