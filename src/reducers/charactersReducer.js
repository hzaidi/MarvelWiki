import Character from '../objects/character';
import {
	FETCH_CHARACTERS_SUCCESS,
	FETCH_CHARACTERS_REJECTED,
	FETCHING,
	SEARCHING,
	FETCH_CHARACTER_BY_ID_SUCCESS,
	UPDATE_FILTERS,
	LOAD_MORE_SUCCESS,
	LOAD_MORE_REJECTED
} from '../actions/charactersActions';


export default function(state = {
	characters: [],
	character: {},
	filter:{
		limit: 24,
		offset: 0,
		total: 0,
		nameStartsWith: '',
		orderBy: 'name',
		modifiedSince: '2010-01-01'
	},
	metaRecord: { limit: 24 }, //Keep the track of 'Total Records', 'Limit', 'Offset' for more fetching
	fetching: true,
	searching: false
}, { type, payload }) {
	switch (type) {
		case FETCH_CHARACTERS_SUCCESS:
			return { ...state,
					characters: payload.data.results.map(c => new Character(c)),
					filter: _payLoadToMetaRecord({ ...state.filter, ...payload.data }),
					fetching: false,
					searching: false };
		case LOAD_MORE_SUCCESS:
			return { ...state,
					characters: state.characters.concat(payload.data.results.map(c => new Character(c))),
					filter: _payLoadToMetaRecord({ ...state.filter, ...payload.data }),
					fetching: false,
					searching: false }
		case FETCH_CHARACTERS_REJECTED:
			return { ...state, characters: {} , fetching: false };
		case FETCHING:
			return { ...state, fetching: true };
		case SEARCHING:
			return { ...state, searching: true };
		case FETCH_CHARACTER_BY_ID_SUCCESS:
			return { ...state,
					character: new Character(payload.data.results[0]),
					fetching: false };
		case UPDATE_FILTERS:
			return { ...state,
				filter: payload
			}
		default:
			return state;
	}
}

function _payLoadToMetaRecord(data) {
	const { results, ...meta } = data;
	return meta;
}