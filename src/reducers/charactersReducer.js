
import Character from '../objects/character';
import {
	FETCH_CHARACTERS_SUCCESS,
	FETCH_CHARACTERS_REJECTED,
	FETCHING,
	SEARCHING,
	FETCH_CHARACTER_BY_ID_SUCCESS,
	UPDATE_FILTERS,
	LOAD_MORE_SUCCESS,
	// LIKE_CHARACTER,
	// LOVE_CHARACTER,
	// DISLIKE_CHARACTER,
	CHARACTERS_BY_LIKE,
	CHARACTERS_BY_LOVE,
	CHARACTERS_BY_DISLIKE
} from '../actions/charactersActions';


export default function(state = {
	collection: [],
	character: {},
	likes: {},
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
				filter: payload }
		// case LIKE_CHARACTER:
		// 	return { ...state,
		// 			collection: state.collection.map(character => character.id === payload.characterId ? { ...character, likes: [ ...character.likes, { uid: payload.uid, displayName: payload.displayName } ]} : character )
		// 		}
		// case LOVE_CHARACTER:
		// 	return { ...state,
		// 		collection: state.collection.map(character => character.id === payload.characterId ? { ...character, loves: [ ...character.loves, { uid: payload.uid, displayName: payload.displayName } ]} : character )
		// 	}
		// case DISLIKE_CHARACTER:
			// return { ...state,
			// 	collection: state.collection.map(character => character.id === payload.characterId ? { ...character, dislikes: [ ...character.dislikes, { uid: payload.uid, displayName: payload.displayName } ]} : character )
			// }
		case CHARACTERS_BY_LIKE:
			return { ...state,
				likes: payload ? {} : payload,
				collection: state.collection.map(character => (payload && payload[character.id]) ? { ...character, likes: objectToArray(payload[character.id]) } : character)
			}
		case CHARACTERS_BY_LOVE:
			return { ...state,
				likes: payload ? {} : payload,
				collection: state.collection.map(character => (payload && payload[character.id]) ? { ...character, loves: objectToArray(payload[character.id]) } : character)
			}
		case CHARACTERS_BY_DISLIKE:
			return { ...state,
				likes: payload ? {} : payload,
				collection: state.collection.map(character => (payload && payload[character.id]) ? { ...character, dislikes: objectToArray(payload[character.id]) } : character)
			}
		default:
			return state;
	}
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