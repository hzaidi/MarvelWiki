import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const devTools = (process.env.NODE_ENV === 'production') ? (a) => a : window.devToolsExtension && window.devToolsExtension();
const middleware = applyMiddleware(thunk, createLogger());
const allStoreEnhancer = compose(
	middleware,
	devTools
);

export default createStore(reducers, allStoreEnhancer);