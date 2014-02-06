data-model
==========

Hosting data files, example code, and documentation for Tidepool's
data model.

[Document outline the current data model thoughts](https://docs.google.com/a/tidepool.org/document/d/1S04g5t_NGs63O6lnJ6eoBJDwt-NESqON8A_EY-Rew9c/edit)

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

