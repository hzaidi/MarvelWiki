
import Character from '../objects/character';
import { objectToArray } from '../helper/objectHelper';
import {
	FETCH_CHARACTERS_SUCCESS,
	FETCH_CHARACTERS_REJECTED,
	FETCHING,
	SEARCHING,
	FETCH_CHARACTER_BY_ID_SUCCESS,
	UPDATE_FILTERS,
	LOAD_MORE_SUCCESS,
	CHARACTERS_BY_LIKE,
	CHARACTERS_BY_LOVE,
	CHARACTERS_BY_DISLIKE
} from '../actions/charactersActions';


export default function(state = {
	collection: [],
	character: {},
	likes: {},
	loves: {},
	dislikes: {},
	filter:{
		limit: 24,
		offset: 0,
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
					collection: payload.results.map(c => new Character(c)).map(character => processCharacter(state, character)),
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
			return { ...state, collection: [], fetching: false };
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
				filter: payload }
		case CHARACTERS_BY_LIKE:
		case CHARACTERS_BY_LOVE:
		case CHARACTERS_BY_DISLIKE:
			return { ...state,
				[ payload.type ]: payload.items ? payload.items : {},
				collection: state.collection.map(character => {
					if(payload.items === null){
						return { ...character, [payload.type]: [] };
					}else if(payload.items[ character.id ]){
						return { ...character, [payload.type]: objectToArray(payload.items[ character.id ]) };
					}else{
						return { ...character, [payload.type]: [] };
					}
				})
			}
		default:
			return state;
	}
}


function processCharacter(state, character) {
	return { ...character,
			likes: (state.likes[character.id]) ? objectToArray(state.likes[character.id]) : [],
			loves: (state.loves[character.id]) ? objectToArray(state.loves[character.id]) : [],
			dislikes: (state.dislikes[character.id]) ? objectToArray(state.dislikes[character.id]) : []
		};
}

function _payLoadToMetaRecord(data) {
	const { results, ...meta } = data;
	return meta;
}