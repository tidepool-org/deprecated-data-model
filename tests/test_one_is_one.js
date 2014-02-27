var should = require('should');
var util = require('util');

describe("validator schema", function ( ) {
  var types = [
      // 'diabetes/basal-inferred.json'
    , 'diabetes/basal-segment.json'
    , 'diabetes/basal-temp.json'
    , 'diabetes/bolus-dual.json'
    , 'diabetes/bolus-normal.json'
    , 'diabetes/bolus-square.json'
    , 'diabetes/carbs.json'
    , 'diabetes/cbg.json'
    , 'diabetes/smbg.json'
    , 'vendors/medtronic/square.json'
    , 'vendors/medtronic/wizard.json'
    , 'message.json'
  ];
  function pathFor (t) {
    var p = '../schemas/' + t.replace('-', '/');
    return p;
  }
  function instanceFor (t) {
    var i = require('../examples/one/' + t);
    return i;
  }
  var V = require('../');
  types.forEach(function (type) {
    var p = pathFor(type);
    var S = require(p);
    var validate = V({schema: S});
    var i = instanceFor(type);

    it(type + ' should validate the sample', function ( ) {
      var report = validate(i);
      report.should.be.ok;
      report.errors.should.be.empty;
    });

    types.forEach(function (other) {
      if (other !== type) {
        var otherSchema = require(pathFor(other));
        var otherValidate = V({schema: otherSchema});
        var otherInstance = instanceFor(other);
        var fmt = "%s should cause instance %s to fail";
        var name = util.format(fmt, type, other);
        it(name, function ( ) {
          var report = validate(otherInstance);
          report.should.be.ok;
          report.errors.should.not.be.empty;
        });

        name = util.format(fmt, other, type);
        it(name, function ( ) {
          var report = otherValidate(i);
          report.should.be.ok;
          report.errors.should.not.be.empty;
        });
      }
    });
  });
});

