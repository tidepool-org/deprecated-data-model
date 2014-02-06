MATIC=./node_modules/.bin/matic
MOCHA=./node_modules/.bin/mocha
TESTS=tests/test_one*
build:
	${MATIC}

test:
	${MOCHA} -R tap ${TESTS}

.PHONY: build test
