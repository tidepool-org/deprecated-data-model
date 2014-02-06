var should = require('should');

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
  var V = require('../');
  types.forEach(function (type) {
    var p = '../schemas/diabetes/' + type.replace('-', '/');
    var S = require(p);
    var validate = V({schema: S});
    var i = require('../examples/one/' + type);
    it(type + ' should validate the sample', function ( ) {
      var report = validate(i);
      report.should.be.ok;
      report.errors.should.be.empty;

    });
  });
});

