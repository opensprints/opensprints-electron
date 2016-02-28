var Cache = require('./local-cache');

var defaults = {
  bikes: 2,
  unitsOfMeasure: 'us',
  rollerDiameter: 2.5,
  rollerUnits: 'cm',
  raceDistance: 200,
  timeDisplay: '',
  winnerMessage: '',
  falseStartMessage: ''
};

var DefaultSettings = (function() {
  function DefaultSettings(data) {
    this.bikes = data.bikes || defaults.bikes;
    this.unitsOfMeasure = data.unitsOfMeasure || defaults.unitsOfMeasure;
    this.rollerDiameter = data.rollerDiameter || defaults.rollerDiameter;
    this.rollerUnits = data.rollerUnits || defaults.rollerUnits;
    this.raceDistance = data.raceDistance || defaults.raceDistance;

  }

  DefaultSettings.get = function() {
    DefaultSettings.cache = (DefaultSettings.cache ||
      new DefaultSettings(Cache.get('settings') || Cache.set('settings', defaults))
    );
    return DefaultSettings.cache;
  };
  return DefaultSettings;
})();
module.exports = DefaultSettings;