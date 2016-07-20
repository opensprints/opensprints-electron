import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import DefaultSettingsPage from './containers/DefaultSettingsPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/default-settings" component={DefaultSettingsPage} />
  </Route>
);

// m.route.mode = 'pathname';
//
// var index = {
//   controller: function() {
//     window.m = m;
//   },
//   view: function() {
//     return m('', [
//       m.component(Header),
//       m('.container', [
//         m.component(QuickRace),
//         m('.btn.round-btn', 'Race Again'),
//         m('.btn.solid-round-btn', 'Next Race')
//       ])
//     ]);
//   }
// };
//
// m.route(document.body, '/', {
//   '/': index,
//   '/default-settings': DefaultSettings,
//   '/roster': Roster,
//   '/race-results': RaceResults
// });
