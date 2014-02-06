MATIC=./node_modules/.bin/matic
MOCHA=./node_modules/.bin/mocha
TESTS=tests/test_one*

SCHEMAS=$(shell find schemas -type f -name "*.json")
TARGETS=$(addprefix web/,${SCHEMAS})


build: ${TARGETS}
	${MATIC}
	rm -Rf web/schemas
	cp -rv schemas web/schemas

web:
	./prep_build.sh

web/schemas/%: schemas/%
	# install -D $< $@

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
