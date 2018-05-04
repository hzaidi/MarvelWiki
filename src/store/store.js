import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const devTools = window.devToolsExtension && window.devToolsExtension();
const middleware = applyMiddleware(thunk, createLogger());
const allStoreEnhancer = compose(
	middleware,
	devTools
);

export default createStore(reducers, allStoreEnhancer);