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
import {incrementRacer} from './actions/race'

const history = createHistory();
const store = configureStore(history);

johnnyFiveAdapter((i)=>store.dispatch(incrementRacer(i))); // eslint-disable-line

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
