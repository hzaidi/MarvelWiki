import Character from '../objects/character';
import {
	FETCH_CHARACTERS_SUCCESS,
	FETCH_CHARACTERS_REJECTED,
	FETCHING,
	SEARCHING,
	SEARCH_CHARACTER_SUCCESS,
	SEARCH_CHARACTER_REJECTED
} from '../actions/charactersActions';


export default function(state = {
	characters: {},
	fetching: true,
	searching: false
}, { type, payload }) {
	switch (type) {
		case FETCH_CHARACTERS_SUCCESS:
			return { ...state, characters: payload.data.results.map(c => new Character(c)), fetching: false };
		case FETCH_CHARACTERS_REJECTED:
			return { ...state, characters: {} , fetching: false };
		case FETCHING:
			return { ...state, fetching: true };
		case SEARCHING:
			return { ...state, searching: true };
		case SEARCH_CHARACTER_SUCCESS:
			return { ...state, characters: payload.data.results.map(c => new Character(c)), searching: false };
		default:
			return state;
	}
}