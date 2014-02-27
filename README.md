data-model
==========

Hosting data files, example code, and documentation for Tidepool's
data model.

## Idea Box

This is just a dump of links to other places where people have listed out potential formats for diabetes data models.

* https://github.com/thedamon/opendatabetes/blob/master/DataFormat.md

## Install
[![Build Status](https://travis-ci.org/tidepool-org/data-model.png?branch=master)](https://travis-ci.org/tidepool-org/data-model)

### Add as dependency
```bash
npm install tidepool-data-model
$ ./node_modules/.bin/tidepool-validate --help
# global install
$ npm install -g tidepool-data-model
$ tidepool-validate --help
```

### Install from source
```bash
$ git clone git://github.com/tidepool-org/data-model.git
$ cd data-model
$ npm install
$ ./bin/tidepool-validate --help
```

## Use 

#### Tab completion
Install tab completion:
```bash
$ . <(tidepool-validate completion)
```

#### Help
`tidepool-validate completion` prints a shell script to provide shell
tab completion so you can tab complete the schema types.  The above
snippet sources the script into your current shell.

```bash
$ tidepool-validate --help
node ./bin/tidepool-validate [opts] <incoming.json|->
Schemas:
  * diabetes/all - An array containing any of the following elements:
  * carbs - carbohydrates eaten
  * basal - inferred, temp, scheduled
  * bolus - wizard/normal, dual, square
  * smbg - self monitored blood glucose, eg a meter finger stick
  * cbg - data from a continous monitoring device


Options:
  -s, --schema  Schema definition
```
##### Valid
```bash
$ ./node_modules/.bin/tidepool-validate --schema=diabetes examples/mixed/all.json
OK: 15 valid records
```

##### Invalid
```bash
$ ./node_modules/.bin/tidepool-validate --schema=bolus examples/one/carbs.json
{ property: 'instance',
  message: 'Property units does not exist in the schema',
  schema: '/diabetes/bolus/normal.json',
  instance: 
   { units: 'grams',
     deviceTime: '2014-02-04T04:46:08',
     type: 'carbs',
     id: '18c4d7ac-4ec5-4de2-8bb4-1ccb95772d74',
     value: 85 },
  stack: 'instance Property units does not exist in the schema' }
{ property: 'instance.recommended',
  message: 'is required',
  schema: 'http://jsonschema.net/recommended',
  stack: 'instance.recommended is required' }
{ property: 'instance.type',
  message: 'is not one of enum values: bolus,bolus-dual',
  schema: { enum: [ 'bolus', 'bolus-dual' ], required: true },
  instance: 'carbs',
  stack: 'instance.type is not one of enum values: bolus,bolus-dual' }
Errors: 3
```

## [Tidepool diabetes data bus](http://tidepool-org.github.io/data-model/)

  * http://tidepool-org.github.io/data-model/

## Contributing

* Fork the repo, and submit a pull request
* File an issue to ask a question or discuss something with the team.
* pro tip: visit http://prose.io/ for a better editing experience.

### Templates

Jade templates can include markdown or use filters to call out to
other templating libraries that you prefer.

```
templates/
├── default.jade
├── includes
│   ├── css.jade
│   ├── footer.jade
│   ├── header.jade
│   ├── properties.jade
│   └── scripts.jade
├── index.jade
├── mixins
│   ├── dl.jade
│   ├── header.jade
│   └── required.jade
└── welcome.markdown
schemas/
├── diabetes
│   ├── basal
│   │   ├── index.json
│   │   ├── inferred.json
│   │   ├── segment.json
│   │   └── temp.json
│   ├── bolus
│   │   ├── dual.json
│   │   ├── normal.json
│   │   ├── pump.json
│   │   └── square.json
│   ├── carbs.json
│   ├── cbg.json
│   ├── index.js
│   └── smbg.json
├── diabetes.json
└── index.json

5 directories, 25 files
```

For every top level `schemas/<SCHEMA>.json`, if there is a matching
`templates/<SCHEMA>.jade`, it will be used as the base template for
that schema.  The results are rendered in the web directory, which is
then synced with the gh-pages branch (by travis on successful build).

The schemas are designed to help model and validate elements on the
diabetes data bus, the platform the http://tidepool.org is delivering.

See http://tidepool-org.github.io/ or http://github.com/tidepool-org/
for more information about Tidepool's technical efforts.

