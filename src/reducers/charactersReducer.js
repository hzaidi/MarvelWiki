
import Character from '../objects/character';
import {
	FETCH_CHARACTERS_SUCCESS,
	FETCH_CHARACTERS_REJECTED,
	FETCHING,
	SEARCHING,
	FETCH_CHARACTER_BY_ID_SUCCESS,
	UPDATE_FILTERS,
	LOAD_MORE_SUCCESS,
	LIKE_CHARACTER,
	LOVE_CHARACTER,
	DISLIKE_CHARACTER,
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
		case LIKE_CHARACTER:
		case LOVE_CHARACTER:
		case DISLIKE_CHARACTER:
			return { ...state,
				collection: state.collection.map(character => character.id === payload.data.characterId ? { ...character, [ payload.type ]: [ ...character[ payload.type ], { uid: payload.data.user.uid, displayName: payload.data.user.displayName } ]} : character )
			}
		case CHARACTERS_BY_LIKE:
		case CHARACTERS_BY_LOVE:
		case CHARACTERS_BY_DISLIKE:
			return { ...state,
				[ payload.type ]: payload.items ? payload.items : {}
				//collection: state.collection.map(character => (state[ payload.type ][ character.id ]) ? { ...character, [payload.type]: objectToArray(state[ payload.type ][ character.id ]) } : character )
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

function objectToArray(object){
	return Object.keys(object).reduce((prev, curr) => {
		prev.push(object[curr])
		return prev;
	}, [])
}

function _payLoadToMetaRecord(data) {
	const { results, ...meta } = data;
	return meta;
}