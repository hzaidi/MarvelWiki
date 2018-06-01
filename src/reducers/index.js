import { combineReducers } from 'redux';

import userState from './userReducer';
import charactersState from './charactersReducer';
import comicsState from './comicsReducer';
import eventsState from './eventsReducer';
import seriesState from './seriesReducer';

const rootReducer = combineReducers({
	userState,
	charactersState,
	comicsState,
	seriesState,
	eventsState
});

export default rootReducer;