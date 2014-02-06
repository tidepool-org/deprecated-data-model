#!/bin/bash

if [ ! -d ./web/ ] ; then
  GIT_URL=$(git remote -v | grep origin | grep push | tr '\t' ' ' | cut -d' ' -f 2)
  if [[ -n "$GH_TOKEN" ]] ; then
    GIT_URL=$(echo $GIT_URL | sed -e "s/git@/${GH_TOKEN}@/g")
  fi
  mkdir web
  pwd
  git clone --branch gh-pages $GIT_URL web/ 2>&1 /dev/null
  echo "./web initialized"
  
else
  echo "Already ready"
fi

