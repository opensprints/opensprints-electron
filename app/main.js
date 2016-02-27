'use strict';
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
//const ipc = require('electron').ipcMain;
//const updater = require('electron-updater');

require('electron-debug')({
  showDevTools: true
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
//let preferencesWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  var path = require('path');
  var fs = require('fs');
  var initPath = path.join(app.getPath('appData'), 'init.json');
  var data;
  try {
    data = JSON.parse(fs.readFileSync(initPath, 'utf8'));
  }
  catch (e){
    //something
  }

  // TODO: figure out how updater is going to work
  mainWindow = new BrowserWindow((data && data.bounds) ? data.bounds : {width: 800, height: 600, x: 0, y: 0});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('close', function() {
    var data = {
      bounds: mainWindow.getBounds()
    };
    fs.writeFileSync(initPath, JSON.stringify(data));
  });

  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  //});

  //updater.on('updateRequired', function() {
  //  app.quit();
  //});

  //updater.on('updateAvailable', function() {
  //  if(mainWindow) {
  //    mainWindow.webContents.send('update-available');
  //  }
  //});

  //preferencesWindow = new BrowserWindow({
  //  width: 400,
  //  height: 400,
  //  show: false
  //});
  //preferencesWindow.loadURL('file://' + __dirname + '/preferences.html');
  //
  //ipc.on('toggle-preferences', function() {
  //  if(preferencesWindow.isVisible()) {
  //    preferencesWindow.hide();
  //  }
  //  else {
  //    preferencesWindow.show();
  //  }
  //});
  //updater.start();
});
