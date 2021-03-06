import axios from 'axios'
import { baseUrl } from '../resolvedUrl';
//import debounce from 'debounce';
import { filterToQueryString } from '../helper/objectHelper';

export const FETCH_COMICS_BY_CHARACTER_ID_SUCCESS = 'comics:ComicsByCharacterId'
export const FETCH_COMICS_BY_CHARACTER_ID_REJECTED = 'comics:ComicsByCharacterIdRejected'
export const FETCH_COMICS_BY_ID_REJECTED = 'comics:ComicsByIdRejected';
export const FETCH_COMICS_BY_ID_SUCCESS = 'comics:ComicsByIdSuccess';
export const FETCHING = 'comics:AjaxCallToFetch';
export const SEARCHING = 'comics:Searching';
export const LOAD_MORE_SUCCESS = 'comcis:LoadMoreSuccess';
export const LOAD_MORE_REJECTED = 'comcis:LoadMoreRejected';
export const RESET_STATE = 'comcis:ResetState';

export function resetState() {
	return (dispatch) => {
		dispatch({ type: RESET_STATE });
	}
}

export function fetchComicById(id, filter = {}) {
	return (dispatch) => {
		dispatch({ type: FETCHING });
		return axios.get(`${baseUrl}/comics/${id}`)
			.then(response => {
				dispatch({ type: FETCH_COMICS_BY_ID_SUCCESS, payload: response.data.data });
			})
			.catch(err => {
				dispatch({ type: FETCH_COMICS_BY_ID_REJECTED, payload: err });
			});
	}
}

export function fetchComicsByCharacterId(id, filter = {}) {
	return (dispatch) => {
		dispatch({ type: FETCHING });
		return _search({ id, filter, dispatch, dispatchTypeSuccess: FETCH_COMICS_BY_CHARACTER_ID_SUCCESS, dispatchTypeRejected: FETCH_COMICS_BY_CHARACTER_ID_REJECTED });
	}
}

export function onLoadMore(id, filter) {
	return (dispatch) => {
		let filterObj = Object.assign({}, filter, { offset: filter.offset + filter.count });
		return _search({ id, dispatch, filter: filterObj, dispatchTypeSuccess: LOAD_MORE_SUCCESS, dispatchTypeRejected: LOAD_MORE_REJECTED });
	}
}


function _search({ id, dispatch, filter = {}, dispatchTypeSuccess , dispatchTypeRejected }) {
	const { total, count, ...newFilterObj } = filter;
	let filterToQueryStringVal = filterToQueryString(newFilterObj);
	let queryString = (filterToQueryStringVal.length) ? `?${filterToQueryStringVal}` : '';
	return axios.get(`${baseUrl}/characters/${id}/comics${queryString}`)
		.then(response => {
			dispatch({ type: dispatchTypeSuccess, payload: response.data.data });
		})
		.catch(err => {
			dispatch({ type: dispatchTypeRejected, payload: err});
		})
}
