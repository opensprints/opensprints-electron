var m = require('mithril');
var Header = require('./header');

var roster = {
  controller: function() {

  },
  view: function() {
    return m('', [
      m.component(Header)
    ]);
  }
};

module.exports = roster;