# OpenSprints Electron [![Build Status](https://travis-ci.org/opensprints/opensprints-electron.svg?branch=master)](https://travis-ci.org/opensprints/opensprints-electron)

## Install for Development or Building Locally

### Install NVM

To install or update nvm, you can use the install script using cURL:

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

or Wget:

```sh
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

<sub>The script clones the nvm repository to `~/.nvm` and adds the source line to your profile (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).</sub>

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

Any issues with NVM install can be solved by reading their [README](https://github.com/creationix/nvm).

Install `node` version 8 using `nvm`:

```bash
nvm install 8
```

### Install Electron Dependencies

Electron has certain dependencies on each system and those need to be installed for Electron to build correctly.

[Linux Build Instructions](https://electronjs.org/docs/development/build-instructions-linux)

[macOS Build Instructions](https://electronjs.org/docs/development/build-instructions-osx)

[Windows Build Instructions](https://electronjs.org/docs/development/build-instructions-windows)

After those dependencies are taken care of,
we can finally grab the source code for this project and have it grab it's dependencies:

```bash
$ git clone https://github.com/opensprints/opensprints-electron.git
$ cd opensprints-electron
$ npm install
```

## Run

```bash
$ npm run dev
```

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

To package apps with options:

```bash
$ npm run package -- --[option]
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

## How to keep your fork of this code updated

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
