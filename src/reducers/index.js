import { combineReducers } from 'redux';

import charactersState from './charactersReducer';
import comicsState from './comicsReducer';
import eventsState from './eventsReducer';
import seriesState from './seriesReducer';

const rootReducer = combineReducers({
	charactersState,
	comicsState,
	seriesState,
	eventsState
});

export default rootReducer;