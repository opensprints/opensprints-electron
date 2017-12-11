import { createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const router = routerMiddleware(hashHistory);
//todo: add necessary items from dev to this file if necessary.
const enhancer = applyMiddleware( router);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
