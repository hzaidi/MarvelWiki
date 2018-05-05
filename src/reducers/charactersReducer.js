import Character from '../objects/character';
import { FETCH_CHARACTERS_SUCCESS,
		FETCH_CHARACTERS_REJECTED,
		FETCHING
} from '../actions/charactersActions';


export default function(state = {
	characters: {},
	fetching: true
}, { type, payload }) {
	switch (type) {
		case FETCH_CHARACTERS_SUCCESS:
			const allCharacters = payload.data.results.map(c => new Character(c));
			return { ...state, characters: allCharacters, fetching: false }
		case FETCHING:
			return { ...state, fetching: true };
		default:
			return state;
	}
}