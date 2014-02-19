
var path = require('path');
var PREFIX = "../schemas";

module.exports = {
    smbg: require(path.join(PREFIX, '/diabetes/smbg.json'))
  , carbs: require(path.join(PREFIX, '/diabetes/carbs.json'))
  , cbg: require(path.join(PREFIX, '/diabetes/cbg.json'))
  , bolus: require(path.join(PREFIX, '/diabetes/bolus/index.json'))
  , bolusNormal: require(path.join(PREFIX, '/diabetes/bolus/normal.json'))
  , bolusDual: require(path.join(PREFIX, '/diabetes/bolus/dual.json'))
  , basal: require(path.join(PREFIX, '/diabetes/basal/index.json'))
  , message: require(path.join(PREFIX, '/message.json'))
};

