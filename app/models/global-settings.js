var Cache = require('./local-cache');

var defaultSettings = {
  bikes: 2,
  unitsOfMeasure: 'us',
  rollerDiameter: 2.5,
  rollerUnits: 'cm',
  raceDistance: 200,
  timeDisplay: '',
  winnerMessage: '',
  falseStartMessage: ''
};

var GlobalSettings = (function() {
  function GlobalSettings(data) {
    this.bikes = data.bikes || defaultSettings.bikes;
    this.unitsOfMeasure = data.unitsOfMeasure || defaultSettings.unitsOfMeasure;
    this.rollerDiameter = data.rollerDiameter || defaultSettings.rollerDiameter;
    this.rollerUnits = data.rollerUnits || defaultSettings.rollerUnits;
  }

  GlobalSettings.get = function() {
    GlobalSettings.cache = (GlobalSettings.cache ||
      new GlobalSettings(Cache.get('settings') || Cache.set('settings', defaultSettings))
    );
    return GlobalSettings.cache;
  };
  return GlobalSettings;
})();
module.exports = GlobalSettings;