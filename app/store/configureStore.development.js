import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import moment from 'moment';
import rootReducer from '../reducers';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';


const logger = createLogger({
  level: 'info',
  collapsed: true,
});

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

export default function configureStore(history) {
  const router = routerMiddleware(history);

  const reducer = storage.reducer(rootReducer);

  function replacer (key, value) {
  if (typeof value === 'moment') {
    return 'foo';
  }
  return value;
}

function reviver (key, value) {
  if (key === 'trialDuration') {
    return moment.duration(value);
  }
  return value;
};

const engine = createEngine('opensprints-state', null, reviver);
  const storageMW = storage.createMiddleware(engine, ['@@router/LOCATION_CHANGE', 'INCREMENT_RACER']);

  const enhancer = composeEnhancers(applyMiddleware(storageMW, router, logger));
  const store = createStore(reducer, {},enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  //if you want to reset the state just comment the below two calls run the app.
  const load = storage.createLoader(engine);
  load(store)
      .then((newState) =>
      console.log('Loaded state:', newState))
      .catch(() => console.log('Failed to load previous state'));
  return store;
}
