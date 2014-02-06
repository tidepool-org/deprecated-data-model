var should = require('should');
var util = require('util');

describe("each sample has a schema", function ( ) {
  var types = [
      'basal-inferred.json'
    , 'basal-segment.json'
    , 'basal-temp.json'
    , 'bolus-dual.json'
    , 'bolus-normal.json'
    , 'bolus-square.json'
    , 'carbs.json'
    , 'cbg.json'
    , 'smbg.json'
  ];
  function pathFor (t) {
    var p = '../schemas/diabetes/' + t.replace('-', '/');
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
        var name = util.format("schema %s should cause instance %s to fail", type, other);
        it(name, function ( ) {
          var report = validate(otherInstance);
          console.log(report);
          report.should.be.ok;
          report.errors.should.not.be.empty;
        });
        name = util.format("schema %s should cause instance %s to fail", other, type);
        it(name, function ( ) {
          var report = otherValidate(i);
          console.log(report);
          report.should.be.ok;
          report.errors.should.not.be.empty;
        });
      }
    });
  });
});

