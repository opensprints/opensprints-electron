var m = require('mithril');
var Header = require('./header');

var RaceResults = {
  controller: function() {

  },
  view: function() {
    return m('.container-fluid', [
      m.component(Header),
      m('.container', [
        // racer results
        // race options
        // on deck
        // messages
      ])
    ]);
  }
};

module.exports = RaceResults;