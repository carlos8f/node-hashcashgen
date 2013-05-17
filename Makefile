REPORTER = spec

all:
	./node_modules/.bin/browserify -s hashcashgen hashcashgen.js > browser/hashcashgen.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --timeout 60000 --reporter $(REPORTER) --bail

.PHONY: test
