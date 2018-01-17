/* eslint-disable no-undef */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import App from './containers/App';
import configureStore from './store/configureStore';
import './app.global.css';

const history = createHistory();
const store = configureStore(history);

global.j5$ = johnnyFiveAdapter();

render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route path="/" component={App} />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);
