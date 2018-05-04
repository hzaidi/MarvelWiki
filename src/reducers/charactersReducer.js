import { FETCH_CHARACTERS_SUCCESS, FETCH_CHARACTERS_REJECTED } from '../actions/charactersActions';
export default function(state = {
	characters: {},
	fetching: false
}, { type, payload }) {
	switch (type) {
		case FETCH_CHARACTERS_SUCCESS:
			return Object.assign({}, state, {
				characters: payload.data
			});
		default:
			return state;
	}
}