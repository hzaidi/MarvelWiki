import { combineReducers } from 'redux';

import charactersState from './charactersReducer';
import comicsState from './comicsReducer';

const rootReducer = combineReducers({
	charactersState,
	comicsState
});

export default rootReducer;