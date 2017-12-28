import { remote } from 'electron';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Header from './Header';
import Undo from './Undo';
import HomePage from './HomePage';
import RosterPage from './RosterPage';
import DefaultSettingsPage from './DefaultSettingsPage';
import RacePreviewPage from './RacePreviewPage';
import RacePage from './RacePage';
import IntermissionPage from './IntermissionPage';
import RaceResultsPage from './RaceResultsPage';

const store = remote.getGlobal('wallpaperStore');
const defaultBackground = '../images/open-sprints-bg.jpg';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallpaperSrc: null
    };
  }

  componentDidMount() {
    this.currentPageWallpaper(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    this.currentPageWallpaper(nextProps.location.pathname);
  }

  onWallpaperLoaded(err, wallpaperSrc) {
    if (err) {
      console.error(err);
      return;
    }
    this.setState({ wallpaperSrc });
  }


  currentPageWallpaper(pathname) {
    const wallpaperFn = this.onWallpaperLoaded.bind(this);
    if (pathname.includes('race')) {
      store.getBackground('raceScreen', wallpaperFn);
    } else if (pathname.includes('intermission')) {
      store.getBackground('intermissionScreen', wallpaperFn);
    } else {
      this.setState({ wallpaperSrc: null });
    }
  }

  render() {
    const { wallpaperSrc } = this.state;
    return (
      <div
        className="background"
        style={{
          background: wallpaperSrc ? `url(${wallpaperSrc}) no-repeat center center fixed` : '#000000'
        }}
      >
        <div className="container-fluid">
          <Header {...this.props} />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/roster" component={RosterPage} />
            <Route path="/default-settings" component={DefaultSettingsPage} />
            <Route path="/race-preview/:raceId" component={RacePreviewPage} />
            <Route path="/race/:raceId" component={RacePage} />
            <Route path="/race-results/:raceId" component={RaceResultsPage} />
            <Route path="/intermission" component={IntermissionPage} />
          </Switch>
          <Undo {...this.props} />
        </div>
      </div>
    );
  }
}
