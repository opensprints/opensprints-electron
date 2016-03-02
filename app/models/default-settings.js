var Cache = require('./local-cache');

var defaults = {
  bikes: 2,
  unitsOfMeasure: 'us',
  rollerDiameter: 2.5,
  rollerUnits: 'cm',
  raceDistance: 200,
  timeDisplay: '',
  winnerMessage: '',
  falseStartMessage: '',
  racerInfo: []
};

var DefaultSettings = (function() {
  function DefaultSettings(data) {
    this.bikes = data.bikes || defaults.bikes;
    this.unitsOfMeasure = data.unitsOfMeasure || defaults.unitsOfMeasure;
    this.rollerDiameter = data.rollerDiameter || defaults.rollerDiameter;
    this.rollerUnits = data.rollerUnits || defaults.rollerUnits;
    this.raceDistance = data.raceDistance || defaults.raceDistance;
    this.racerInfo = data.racerInfo || defaults.racerInfo;

  }

  DefaultSettings.get = function() {
    DefaultSettings.cache = (DefaultSettings.cache ||
      new DefaultSettings(Cache.get('settings') || Cache.set('settings', defaults))
    );
    return DefaultSettings.cache;
  };

  DefaultSettings.prototype.save = function() {
    Cache.set('settings', this);
  };

  return DefaultSettings;
})();
module.exports = DefaultSettings;