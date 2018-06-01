import {
	LOGIN,
	LOGOUT
} from '../actions/userActions';

export default function(state = {
	isAuthenticated: false,
	user: null
 }, { type, payload }) {
	switch (type) {
		case LOGIN:
			return {...state, isAuthenticated: true, user: payload};
		case LOGOUT:
		return {...state, isAuthenticated: false, user: null};
		default:
			return state;
	}
}