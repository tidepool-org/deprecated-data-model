
var jsonschema = require('jsonschema')
  , es = require('event-stream')
  , fs = require('fs')
  , util = require('util')
  ;


var diabetes = require('./schemas/diabetes/');
var schema = require('./schemas/diabetes.json');


var schemas = [
    diabetes.smbg
  , schema
  ];

function create (opts) {
  opts = opts || { };
  var config = {sync: true};
  var validator = new jsonschema.Validator( );
  validator.addSchema(schema, '/');
  function importMissing ( ) {
    var missing = validator.unresolvedRefs.shift( );
    if (!missing) { return; };
    if (/^\/diabetes/g.test(missing)) {
      var p = './schemas' + missing;
      var S = require(p);
      validator.addSchema(S, missing);
      importMissing( );
    }
  }
  importMissing( );
  return validator;
}


module.exports = create;

function stream (V) {
  var out = es.through(writer);
  var S;
  function writer (data) {
    var self = this;
    self.queue(V.validate(data, schema));
  }
  return out;
}

if (!module.parent) {
  var datum = create( );
  var incoming = process.argv[2];
  if (incoming == '-' || !incoming) {
    incoming = process.stdin;
    incoming.resume( );
  } else {
    incoming = fs.createReadStream(incoming);
  }
  es.pipeline(incoming, es.parse( ), stream(datum), es.writeArray(done));
  function done (err, results) {
    var report = results.pop( );
    var status = util.format("OK: %d valid records", report.instance.length);
    if (report.errors.length > 0) {
      status = util.format("Errors:", report.errors);
    }
    console.log(status);
  }

}
