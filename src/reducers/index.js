import { combineReducers } from 'redux';

import charactersState from './charactersReducer';
import creatorsState from './creatorsReducer';

const rootReducer = combineReducers({
	charactersState,
	creatorsState
});

export default rootReducer;