import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import * as reduxImmutable from 'redux-immutable-state-invariant';

const devTools = (process.env.NODE_ENV === 'production') ? (a) => a : window.devToolsExtension && window.devToolsExtension();
const middleware = process.env.NODE_ENV === 'production' ? [ thunk ] : [ thunk, createLogger(), reduxImmutable.default() ]
const allStoreEnhancer = compose(
	applyMiddleware(...middleware),
	devTools
);

export default createStore(reducers, allStoreEnhancer);