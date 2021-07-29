const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let menu;
let template;
let mainWindow = null;


if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {} // eslint-disable-line
    }
  }
};

app.on('ready', async () => {
  await installExtensions();

  // TODO: test with multiple monitors
  const initPath = path.join(app.getPath('userData'), 'init.json');
  let data;
  try {
    data = JSON.parse(fs.readFileSync(initPath, 'utf8'));
  } catch (e) {
    // something
  }
  const windowConfig = (data && data.bounds) ? data.bounds :
    {
      width: 800,
      height: 600,
      x: 0,
      y: 0
    };

  windowConfig.show = false;
  windowConfig.icon = path.join(__dirname, 'images/icon.png');

  mainWindow = new BrowserWindow(windowConfig);

  mainWindow.loadURL(`file://${__dirname}/app/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('close', () => {
    fs.writeFileSync(initPath, JSON.stringify({ bounds: mainWindow.getBounds() }));
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
    mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(x, y);
        }
      }]).popup(mainWindow);
    });
  }

  if (process.platform === 'darwin') {
    template = [{
      label: 'Electron',
      submenu: [{
        label: 'About ElectronReact',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide ElectronReact',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    }, {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          mainWindow.webContents.reload();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('https://github.com/opensprints/opensprints-electron');
        }
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/opensprints/opensprints-electron/tree/master/docs#readme');
        }
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/opensprints/opensprints-electron/issues');
        }
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click() {
          mainWindow.close();
        }
      }]
    }, {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click() {
          mainWindow.webContents.reload();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('https://github.com/opensprints/opensprints-electron');
        }
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/opensprints/opensprints-electron/tree/master/docs#readme');
        }
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/opensprints/opensprints-electron/issues');
        }
      }]
    }];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});

const defaults = {
  raceScreen: '../images/open-sprints-bg.jpg',
  raceClock: '../images/open-sprints-bg.jpg',
  intermissionScreen: '../images/open-sprints-bg.jpg'
};

const wallpaperTemplates = {
  raceScreen: 'images/open-sprints-background.psd',
  raceClock: 'images/open-sprints-clock.psd',
  intermissionScreen: 'images/open-sprints-intermission.psd'
};

const fileTypes = {
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'jpe': 'image/jpeg',
  'gif': 'image/gif',
  'webp': 'image/webp'
};

class Store {
  constructor(opts) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = app.getPath('userData');
    // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, opts.configName + '.json');

    this.data = parseDataFile(this.path, opts.defaults);
  }

  // This will just return the property on the `data` object
  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    // Wait, I thought using the node.js' synchronous APIs was bad form?
    // We're not writing a server so there's not nearly the same IO demand on the process
    // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
    // we might lose that data. Note that in a real app, we would try/catch this.
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  getBackground(key, fn) {
    const filePath = this.get(key);

    if (filePath === defaults[key]) {
      fn(null, this.get(key));
      return;
    }

    const fileExt = filePath.substring(filePath.lastIndexOf('.') + 1);
    const fileType = fileTypes[fileExt];

    fs.readFile(filePath, (err, buffer) => {
      if (err) {
        fn(err);
        return;
      }
      fn(null, `data:${fileType};base64,` + buffer.toString('base64'));
    });
  }

  setNewBackground(key, filePath, fileName, fn) {
    this.set(key, path.join(app.getPath('userData'), fileName));
    const writeFileStream = fs.createWriteStream(path.join(app.getPath('userData'), fileName));
    writeFileStream.on('close', () => fn(null));
    writeFileStream.on('error', (err) => fn(err));
    fs.createReadStream(filePath).pipe(writeFileStream);
  }

  downloadTemplate(bKey, fn) {
    const writeFileStream = fs.createWriteStream(path.join(app.getPath('downloads'),
      wallpaperTemplates[bKey].substring(wallpaperTemplates[bKey].lastIndexOf('/') + 1))
    );
    writeFileStream.on('close', () => fn(null));
    writeFileStream.on('error', (err) => fn(err));
    fs.createReadStream(path.join(__dirname, wallpaperTemplates[bKey])).pipe(writeFileStream)
  }
}

function parseDataFile(filePath, defaults) {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

global.wallpaperStore = new Store({
  configName: 'wallpaper-config',
  defaults: {
    raceScreen: '../images/open-sprints-bg.jpg',
    raceClock: '../images/open-sprints-bg.jpg',
    intermissionScreen: '../images/open-sprints-bg.jpg'
  }
});
