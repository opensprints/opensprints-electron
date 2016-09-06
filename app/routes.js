import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import RosterPage from './containers/RosterPage';
import DefaultSettingsPage from './containers/DefaultSettingsPage';
import RacePreviewPage from './containers/RacePreviewPage';
import RacePage from './containers/RacePage';
import IntermissionPage from './containers/IntermissionPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/roster" component={RosterPage} />
    <Route path="/default-settings" component={DefaultSettingsPage} />
    <Route path="/race-preview/:race" component={RacePreviewPage} />
    <Route path="/race/:race" component={RacePage} />
    <Route path="/intermission" component={IntermissionPage} />
  </Route>
);
