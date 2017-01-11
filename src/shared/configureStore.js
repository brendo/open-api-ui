import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { createHashHistory } from 'history';
import { routerReducer } from 'react-router-redux';

import definitionReducer from './reducers/definitionReducer';

export const history = createHashHistory();

export default function configureStore(initialState = window.STATE_FROM_SERVER) {
  const reducer = combineReducers({
    definition: definitionReducer,
    routing: routerReducer
  });

  const enhancer = compose(
    applyMiddleware(thunk),
    history
  );

  const store = createStore(
    reducer,
    initialState,
    compose(applyMiddleware(thunk, createLogger()))
  );

  return store;
}
