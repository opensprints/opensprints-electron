//var remote = require('remote');
//var ipc = require('electron').ipcRenderer;
//var Menu = remote.require('menu');
var serial = require('./lib/serial');

serial.findArduino(function(serialPort) {
  // TODO: notify that a new Arduino device has been detected.
  // We have the arduino port!
  console.log('MEGA-GIGA-BYTE SON!');
  // TODO: What do we do with it?
  console.log(serialPort);
});

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