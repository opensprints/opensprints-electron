# OpenSprints Electron [![Build Status](https://travis-ci.org/opensprints/opensprints-electron.svg?branch=master)](https://travis-ci.org/opensprints/opensprints-electron)

This project was forked (with love) from [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)

## Install

First, clone the repo via git:

```bash
git clone https://github.com/opensprints/opensprints-electron.git
```

And then install dependencies.

```bash
$ cd opensprints-electron && npm install
```


## Run

Run this two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

or run two servers with one command

```bash
$ npm run dev
```

*Note: requires a node version >= 4 and an npm version >= 2.*


## DevTools

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

*See [electron-debug](https://github.com/sindresorhus/electron-debug) for more information.*

#### Redux DevTools

We used [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension), you can find the `Redux` tab on Chrome DevTools.

## Externals

If you use any 3rd party libraries which can't be built with webpack, you must list them in your `webpack.config.base.js`：

```javascript
externals: [
  // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
]
```

You can find those lines in the file.


## CSS Modules

This boilerplate out of the box is configured to use [css-modules](https://github.com/css-modules/css-modules).

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`


## Package

```bash
$ npm run package
```

To package apps for all platforms:

```bash
$ npm run package-all
```

#### Options

- --name, -n: Application name (default: ElectronReact)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms

Use `electron-packager` to pack your app with `--all` options for darwin (osx), linux and win32 (windows) platform. After build, you will find them in `release` folder. Otherwise, you will only find one for your os.

`test`, `tools`, `release` folder and devDependencies in `package.json` will be ignored by default.

#### Default Ignore modules

We add some module's `peerDependencies` to ignore option as default for application size reduction.

- `babel-core` is required by `babel-loader` and its size is ~19 MB
- `node-libs-browser` is required by `webpack` and its size is ~3MB.

> **Note:** If you want to use any above modules in runtime, for example: `require('babel/register')`, you should move them from `devDependencies` to `dependencies`.

#### Building windows apps from non-windows platforms

Please checkout [Building windows apps from non-windows platforms](https://github.com/maxogden/electron-packager#building-windows-apps-from-non-windows-platforms).

## Dispatching redux actions from main process

see discusses in [#118](https://github.com/chentsulin/electron-react-boilerplate/issues/118) and [#108](https://github.com/chentsulin/electron-react-boilerplate/issues/108)

## How hot-reloading works on Electron

We use [webpack-target-electron-renderer](https://github.com/chentsulin/webpack-target-electron-renderer) to provide a build target for electron renderer process. Read more information [here](https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works).

> Note: webpack >= 1.12.15 has built-in support for `electron-main` and `electron-renderer` targets.

## How to keep the boilerplate updated

If your application is a fork from this repo, you can add this repo to another git remote:

```sh
git remote add upstream https://github.com/chentsulin/electron-react-boilerplate.git
```

Then, use git to merge some latest commits:

```sh
git pull upstream master
```

## Native-like UI

If you want to have native-like User Interface (OS X El Capitan and Windows 10), [react-desktop](https://github.com/gabrielbull/react-desktop) may perfect suit for you.


## Maintainers

- [Nick Stewart](https://github.com/nickstew)

## License
MIT © [OpenSprints](https://github.com/opensprints)

[travis-image]: https://travis-ci.org/opensprints/opensprints-electron.svg?branch=master
[travis-url]: https://travis-ci.org/opensprints/opensprints-electron
