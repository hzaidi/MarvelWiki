import Character from '../objects/character';
import {
	FETCH_CHARACTERS_SUCCESS,
	FETCH_CHARACTERS_REJECTED,
	FETCHING,
	SEARCHING,
	FETCH_CHARACTER_BY_ID_SUCCESS
} from '../actions/charactersActions';


export default function(state = {
	characters: {},
	character: {},
	fetching: true,
	searching: false
}, { type, payload }) {
	switch (type) {
		case FETCH_CHARACTERS_SUCCESS:
			return { ...state, characters: payload.data.results.map(c => new Character(c)), fetching: false, searching: false };
		case FETCH_CHARACTERS_REJECTED:
			return { ...state, characters: {} , fetching: false };
		case FETCHING:
			return { ...state, fetching: true };
		case SEARCHING:
			return { ...state, searching: true };
		case FETCH_CHARACTER_BY_ID_SUCCESS:
			return { ...state, character: new Character(payload.data.results[0]), fetching: false };
		default:
			return state;
	}
}