var m = require('mithril');
//var remote = require('remote');
//var ipc = require('electron').ipcRenderer;
//var Menu = remote.require('menu');
//var serial = require('./lib/serial');
var Header = require('./header');
var DefaultSettings = require('./default-settings');
var Roster = require('./roster');
var QuickRace = require('./quick-race');
var RaceResults = require('./race-results');

//serial.findArduino(function(serialPort) {
//  serialPort.on('data', function(data) {
//    console.log(data);
//  });
//  serialPort.open(function(){
//    serialPort.write('g\n', function(err, result) {
//      console.log(result);
//      serialPort.drain(function() {
//        console.log('hello!');
//      });
//    });
//  });

  // TODO: notify that a new Arduino device has been detected.
  // We have the arduino port!
  //console.log('MEGA-GIGA-BYTE SON!');
  // TODO: What do we do with it?
//});

//var menu = Menu.buildFromTemplate([
//  {
//    // first menu element's label doesn't matter on OSX, it's the name of your application
//    // for consistency, use your application name as the label
//    label: 'Something',
//    submenu: [
//      {
//        label: 'Preferences',
//        click: function() {
//          ipc.send('toggle-preferences');
//        }
//      }
//    ]
//  }
//]);

//Menu.setApplicationMenu(menu);

m.route.mode = 'pathname';

var index = {
  controller: function() {
    window.m = m;
  },
  view: function() {
    return m('', [
      m.component(Header),
      m('.container', [
        m.component(QuickRace),
        m('.btn.round-btn', 'Race Again'),
        m('.btn.solid-round-btn', 'Next Race')
      ])
    ]);
  }
};

m.route(document.body, '/', {
  '/': index,
  '/default-settings': DefaultSettings,
  '/roster': Roster,
  '/race-results': RaceResults
});

