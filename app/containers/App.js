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

export default class App extends Component {

  render() {
    return (
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
    );
  }
}
