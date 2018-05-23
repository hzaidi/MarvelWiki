import { combineReducers } from 'redux';

import charactersState from './charactersReducer';
import comicsState from './comicsReducer';
import eventsState from './eventsReducer';
import seriesState from './seriesReducer';
import storiesState from './storiesReducer';

const rootReducer = combineReducers({
	charactersState,
	comicsState,
	seriesState,
	storiesState,
	eventsState
});

export default rootReducer;