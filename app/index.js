var remote = require('remote');
var ipc = require('electron').ipcRenderer;
var Menu = remote.require('menu');

var menu = Menu.buildFromTemplate([
  {
    // first menu element's label doesn't matter on OSX, it's the name of your application
    // for consistency, use your application name as the label
    label: 'Something',
    submenu: [
      {
        label: 'Preferences',
        click: function() {
          ipc.send('toggle-preferences');
        }
      }
    ]
  }
]);

Menu.setApplicationMenu(menu);