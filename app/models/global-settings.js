var defaultSettings = {
  bikes: 4,
  unitsOfMeasure: 'us',
  rollerDiameter: 2.5,
  rollerUnits: 'cm',
  raceDistance: 200,
  timeDisplay: '',
  winnerMessage: '',
  falseStartMessage: ''
}

var GlobalSettings = (function() {
  function GlobalSettings(data) {
    this.bikes = data.bikes || defaultSettings.bikes
    this.unitsOfMeasure = data.unitsOfMeasure || defaultSettings.unitsOfMeasure
    this.rollerDiameter = data.rollerDiameter || defaultSettings.rollerDiameter
    this.rollerUnits = data.rollerUnits || defaultSettings.rollerUnits
  }
  return GlobalSettings
})()
module.exports = GlobalSettings