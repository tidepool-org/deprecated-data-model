
var jsonschema = require('jsonschema')
  , es = require('event-stream')
  , fs = require('fs')
  , util = require('util')
  ;

var diabetes = require('./schemas/diabetes/');
var schema = require('./schemas/diabetes.json');

function getSchemaFor (o) {
  var out = o;
  switch (o) {
    case 'bolus':
      out = diabetes.bolusNormal;
      break;
    case 'smbg':
      out = diabetes.smbg;
      break;
    case 'carbs':
      out = diabetes.carbs;
      break;
    case 'cbg':
      out = diabetes.cbg;
      break;
    case null:
    case '':
    case 'diabetes':
    default:
      out = schema;
      break;
  }
  return out;
}

function create (opts) {
  opts = opts || { };
  var validator = new jsonschema.Validator( );
  var master = getSchemaFor(opts.schema);
  validator.addSchema(master, '/');
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


  function validate (data) {
    return validator.validate(data, master);
  }
  return validate;
}


module.exports = create;
module.exports.stream = stream;
module.exports.getSchemaFor = getSchemaFor;

function stream (validate) {
  var out = es.through(writer);
  var S;
  function writer (data) {
    var self = this;
    self.queue(validate(data, schema));
  }
  return out;
}

if (!module.parent) {
  var validator = create( );
  var incoming = process.argv[2];
  if (incoming == '-' || !incoming) {
    incoming = process.stdin;
    incoming.resume( );
  } else {
    incoming = fs.createReadStream(incoming);
  }
  es.pipeline(incoming, es.parse( ), stream(validator), es.writeArray(done));
  function done (err, results) {
    var report = results.pop( );
    var status = util.format("OK: %d valid records", report.instance.length || results.length + 1);
    if (report.errors.length > 0) {
      status = util.format("Errors:", report.errors);
    }
    console.log(status);
  }

}
