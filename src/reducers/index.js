import { combineReducers } from 'redux';

import characters from './charactersReducer';
import creators from './creatorsReducer';

const rootReducer = combineReducers({
	characters,
	creators
});

export default rootReducer;