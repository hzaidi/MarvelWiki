import axios from 'axios'
import { baseUrl } from '../resolvedUrl';
import debounce from 'debounce';
import { filterToQueryString } from '../helper/objectHelper';
import { seedDbWithCharacters,
	onCharacterLike as fireDbOnCharacterLike,
	onCharacterlove as fireDbOnCharacterLove,
	onCharacterDislike as fireDbOnCharacterDislike,
	likesRef as fireDbLikesRef,
	lovesRef as fireDbLovesRef,
	dislikesRef as fireDbDislikeRef
} from '../firebaseActions/characterAction';

export const FETCH_CHARACTERS_SUCCESS = 'characters:GetAll';
export const FETCH_CHARACTERS_REJECTED = 'characters:GetAllRejected';
export const FETCHING = 'characters:AjaxCallToFetch';
export const SEARCHING = 'characters:Searching';
export const LOAD_MORE_SUCCESS = 'characters:LoadMoreSuccess';
export const LOAD_MORE_REJECTED = 'characters:LoadMoreRejected';
export const FETCH_CHARACTER_BY_ID_SUCCESS = 'character:GetOneById';
export const FETCH_CHARACTER_BY_ID_REJECTED = 'character:GetOneByIdRejected';
export const UPDATE_FILTERS = 'character:UpdateFilters';
export const CHARACTERS_BY_LIKE = 'character:CharactersByLike';
export const CHARACTERS_BY_LOVE = 'character:CharactersByLove';
export const CHARACTERS_BY_DISLIKE = 'character:CharactersByDislike';
export const LIKE_CHARACTER = 'character:LikeChracter';
export const LOVE_CHARACTER = 'character:LoveChracter';
export const DISLIKE_CHARACTER = 'character:DislikeChracter';


export function likesRef() {
	return (dispatch) => {
		return fireDbLikesRef.on('value', (snapshot) => {
			let items = snapshot.val();
			dispatch({ type: CHARACTERS_BY_LIKE, payload: { type: 'likes', items } })
		});
	}
}


export function lovesRef() {
	return (dispatch) => {
		return fireDbLovesRef.on('value', (snapshot) => {
			let items = snapshot.val();
			dispatch({ type: CHARACTERS_BY_LOVE, payload: { type: 'loves', items } })
		});
	}
}



export function dislikesRef() {
	return (dispatch) => {
		return fireDbDislikeRef.on('value', (snapshot) => {
			let items = snapshot.val();
			dispatch({ type: CHARACTERS_BY_DISLIKE, payload: { type: 'dislikes', items } })
		});
	}
}


export function onCharacterLike(characterId, user){
	return (dispatch) => {
		return fireDbOnCharacterLike(characterId, user).then(_ => dispatch({ type: LIKE_CHARACTER, payload: { type: 'likes', data: { characterId, user } } }));
	}

}

export function onCharacterLove(characterId, user){
	return (dispatch) => {
		return fireDbOnCharacterLove(characterId, user).then(_ => dispatch({ type: LOVE_CHARACTER, payload: { type: 'loves', data: { characterId, user } } }));
	}

}

export function onCharacterDislike(characterId, user){
	return (dispatch) => {
		return fireDbOnCharacterDislike(characterId, user).then(_ => dispatch({ type: DISLIKE_CHARACTER, payload: { type: 'dislikes', data: { characterId, user } } }));
	}
}

export function fetchCharacters(filter) {
	return (dispatch) => {
		dispatch({ type: FETCHING });
		return _search({ dispatch, filter, dispatchTypeSuccess: FETCH_CHARACTERS_SUCCESS, dispatchTypeRejected: FETCH_CHARACTERS_REJECTED  })
	}
}

export function filterCharacters(filter) {
	return (dispatch) => {
		dispatch({ type: SEARCHING });
		dispatch({ type: UPDATE_FILTERS, payload: filter });
		return _debounceSearch(dispatch, filter);
	}
}

export function fetchCharacterById(id) {
	return (dispatch) => {
		dispatch({ type: FETCHING });
		return axios.get(`${baseUrl}/characters/${id}`)
			.then(response => {
				dispatch({ type: FETCH_CHARACTER_BY_ID_SUCCESS, payload: response.data.data});
			})
			.catch(err => {
				dispatch({ type: FETCH_CHARACTER_BY_ID_REJECTED, payload: err});
			})
	}
}

export function onLoadMore(filter) {
	return (dispatch) => {
		let updatedFilter = Object.assign({}, filter, { offset: filter.offset + filter.count });
		return _search({ dispatch, filter: updatedFilter, dispatchTypeSuccess: LOAD_MORE_SUCCESS, dispatchTypeRejected: LOAD_MORE_REJECTED });
	}
}

let _debounceSearch = debounce((dispatch, filter) => {
	dispatch({ type: FETCHING });
	return _search({dispatch, filter, dispatchTypeSuccess: FETCH_CHARACTERS_SUCCESS, dispatchTypeRejected: FETCH_CHARACTERS_REJECTED })
}, 1000)

function _search({ dispatch, filter = {}, dispatchTypeSuccess , dispatchTypeRejected }) {
	const { total, count, ...newFilterObj } = filter;
	let filterToQueryStringVal = filterToQueryString(newFilterObj);
	let queryString = (filterToQueryStringVal.length) ? `?${filterToQueryStringVal}` : '';
	return axios.get(`${baseUrl}/characters${queryString}`)
		.then(response => {
			seedDbWithCharacters(response.data.data.results);
			dispatch({ type: dispatchTypeSuccess, payload: Object.assign({}, filter, response.data.data)});
		})
		.catch(err => {
			dispatch({ type: dispatchTypeRejected, payload: err});
		})
}

