
var jsonschema = require('jsonschema')
  , es = require('event-stream')
  , fs = require('fs')
  , util = require('util')
  ;

var diabetes = require('./lib/');
var schema = require('./schemas/diabetes.json');

function getSchemaFor (o) {
  var out = o;
  if (!o) {
    return schema;
  }
  if (o && o.title && o['$schema']) {
    return o;
  }
  switch (o) {
    case 'bolus':
      out = diabetes.bolus;
      break;
    case 'basal':
      out = diabetes.basal;
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
    case 'medtronic/bolus':
      out = diabetes.medtronic.bolus;
      break;
    case 'medtronic/wizard':
      out = diabetes.medtronic.wizard;
      break;
    case 'message':
      out = diabetes.message;
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

var base = 'http://tidepool-org.github.io/data-model/schemas/';
// 'diabetes/bolus/pump.json'

function create (opts) {
  opts = opts || { };
  var validator = new jsonschema.Validator( );
  var master = getSchemaFor(opts.schema);
  validator.addSchema(master, '/');
  function importMissing ( ) {
    var missing = validator.unresolvedRefs.shift( );
    if (!missing) { return; };
    missing = missing.replace(base, '');
    var after = missing.split('#');
    var hash = false;
    if (after.length > 1) {
      hash = true;
      missing = after.shift( );
      after = after.pop( );
    }
    if (/.*.json$/g.test(missing)) {
      var p = './schemas/' + missing;
      var S = require(p);
      var u = base + missing;
      if (hash) {
        u = u + '#' + after;
        var key = after.split('definitions/').pop( );
        S = S.definitions[key];
      }
      S.id = u;
      validator.addSchema(S, u);
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
    self.queue(validate(data));
  }
  return out;
}

if (!module.parent) {
  var validator = create( );
  var incoming = process.argv.slice(2).shift( ) || '-';
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
