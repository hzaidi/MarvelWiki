
import Character from '../objects/character';
import {
	FETCH_CHARACTERS_SUCCESS,
	FETCH_CHARACTERS_REJECTED,
	FETCHING,
	SEARCHING,
	FETCH_CHARACTER_BY_ID_SUCCESS,
	UPDATE_FILTERS,
	LOAD_MORE_SUCCESS
} from '../actions/charactersActions';


export default function(state = {
	collection: [],
	character: {},
	filter:{
		limit: 24,
		offset: 0,
		//total: 0,
		nameStartsWith: '',
		orderBy: 'name',
		modifiedSince: '2010-01-01'
	},
	fetching: true,
	searching: false
}, { type, payload }) {
	switch (type) {
		case FETCH_CHARACTERS_SUCCESS:
			return { ...state,
					collection: payload.results.map(c => new Character(c)),
					filter: _payLoadToMetaRecord({ ...state.filter, ...payload }),
					fetching: false,
					searching: false };
		case LOAD_MORE_SUCCESS:
			return { ...state,
					collection: state.collection.concat(payload.results.map(c => new Character(c))),
					filter: _payLoadToMetaRecord({ ...state.filter, ...payload }),
					fetching: false,
					searching: false }
		case FETCH_CHARACTERS_REJECTED:
			return { ...state, collection: {} , fetching: false };
		case FETCHING:
			return { ...state, fetching: true };
		case SEARCHING:
			return { ...state, searching: true };
		case FETCH_CHARACTER_BY_ID_SUCCESS:
			return { ...state,
					character: new Character(payload.results[0]),
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