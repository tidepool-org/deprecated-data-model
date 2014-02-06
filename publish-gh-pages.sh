#!/bin/bash

echo "push build results to gh-pages"
cd web/
(git push origin gh-pages 2>&1 > /dev/null) || echo "oops"

