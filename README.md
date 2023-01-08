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

Install `node` version 16 using `nvm`:

```bash
$ nvm install 16
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

## Package

```bash
$ npm run package
```

Linux:

```bash
$ npm run package-linux
```

Mac:

```bash
$ npm run package-mac
```

Also to create a Mac installer `.dmg` after package:

```bash
$ npm run create-installer-mac
```

Windows:

```bash
$ npm run package-win
```

To package apps for all platforms:

```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

After build, you will find your build in `release-builds` folder.

#### Options

- --name, -n: Application name (default: ElectronReact)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms

<sub>`test`, `tools`, `release` folder and devDependencies in `package.json` will be ignored by default.</sub>

### Externals

If you use any 3rd party libraries which can't be built with webpack, you must list them in your `webpack.config.base.js`：

```javascript
externals: [
  // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
]
```

You can find those lines in the file.

### CSS Modules

This boilerplate out of the box is configured to use [css-modules](https://github.com/css-modules/css-modules).

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`

## Maintainers

- [Nick Stewart](https://github.com/nickstew)

## License
MIT © [OpenSprints](https://github.com/opensprints)

[travis-image]: https://travis-ci.org/opensprints/opensprints-electron.svg?branch=master
[travis-url]: https://travis-ci.org/opensprints/opensprints-electron
