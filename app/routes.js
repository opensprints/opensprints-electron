import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import RosterPage from './containers/RosterPage';
import DefaultSettingsPage from './containers/DefaultSettingsPage';
import PreRaceReviewPage from './containers/PreRaceReviewPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/roster" component={RosterPage} />
    <Route path="/default-settings" component={DefaultSettingsPage} />
    <Route path="/pre-race-review/:race" component={PreRaceReviewPage} />
  </Route>
);
