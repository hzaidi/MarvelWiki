import axios from 'axios'
import { baseUrl } from '../resolvedUrl';
//import debounce from 'debounce';
import { filterToQueryString } from '../helper/objectHelper';

export const FETCH_SERIES_BY_CHARACTER_ID_SUCCESS = 'series:SeriesByCharacterId'
export const FETCH_SERIES_BY_CHARACTER_ID_REJECTED = 'series:SeriesByCharacterIdRejected'
export const FETCHING = 'series:AjaxCallToFetch';
export const SEARCHING = 'series:Searching';
export const LOAD_MORE_SUCCESS = 'series:LoadMoreSuccess';
export const LOAD_MORE_REJECTED = 'series:LoadMoreRejected';

export function fetchSeriesByCharacterId(id, filter = {}) {
	return (dispatch) => {
		dispatch({ type: FETCHING });
		return _search({ id, filter, dispatch, dispatchTypeSuccess: FETCH_SERIES_BY_CHARACTER_ID_SUCCESS, dispatchTypeRejected: FETCH_SERIES_BY_CHARACTER_ID_REJECTED });
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
	return axios.get(`${baseUrl}/characters/${id}/series${queryString}`)
			.then(response => {
				dispatch({ type: dispatchTypeSuccess, payload: response.data});
			})
			.catch(err => {
				dispatch({ type: dispatchTypeRejected, payload: err});
			})
}
