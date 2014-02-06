MATIC=./node_modules/.bin/matic
MOCHA=./node_modules/.bin/mocha
TESTS=tests/test_one*

build:
	${MATIC}

web:
	./prep_build.sh

clean:
	rm -Rf web/

web/clean:
	./clean-gh-pages.sh

gh-pages: clean web web/clean build
	./save-gh-pages.sh

travis: test gh-pages
	# travis finished

test:
	${MOCHA} -R tap ${TESTS}

.PHONY: build test
