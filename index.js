
var jsonschema = require('jsonschema')
  , es = require('event-stream')
  , fs = require('fs')
  ;


var diabetes = require('./schemas/diabetes/');
var schema = require('./schemas/diabetes.json');
/*
var base =  'http://tidepool.github.io/data-model/';
schema.id = base;
var base =  'http://tidepool.github.io/data-model/diabetes/';
diabetes.bolus.id = base + 'bolus/pump.json';
diabetes.carbs.id = base + 'carbs.json';
console.log(diabetes.carbs.id);
*/


var schemas = [
    diabetes.smbg
  , schema
  ];

function create (opts) {
  opts = opts || { };
  var config = {sync: true};
  var validator = new jsonschema.Validator( );
  console.log(schema);
  validator.addSchema(schema, '/');
  function importMissing ( ) {
    console.log("MISSING", validator.unresolvedRefs);
    var missing = validator.unresolvedRefs.shift( );
    console.log('IMPORT', arguments, missing);
    if (!missing) { console.log('ready'); return; };
    if (/^\/diabetes/g.test(missing)) {
      var p = './schemas' + missing;
      var S = require(p);
      console.log('ppp', p, missing, S, validator, validator.addSchema);
      validator.addSchema(S, missing);
      importMissing( );
    }
  }
  importMissing( );
  console.log(validator);
  return validator;
}


module.exports = create;

function stream (V) {
  var out = es.through(writer);
  var S;
  function writer (data) {
    var self = this;

    // self.queue(data);
    self.queue(V.validate(data, schema));
    // self.queue(r);
  }
  return out;
}

if (!module.parent) {
  console.log("howdy");
  var datum = create( );
  var incoming = process.argv[2];
  if (incoming == '-' || !incoming) {
    incoming = process.stdin;
    incoming.resume( );
  } else {
    incoming = fs.createReadStream(incoming);
  }
  es.pipeline(incoming, es.parse( ), stream(datum), es.stringify( ),  process.stdout);

}
