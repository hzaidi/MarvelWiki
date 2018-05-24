import axios from 'axios'
import { baseUrl } from '../resolvedUrl';
//import debounce from 'debounce';
import { filterToQueryString } from '../helper/objectHelper';

export const FETCH_COMICS_BY_CHARACTER_ID_SUCCESS = 'comics:ComicsByCharacterId'
export const FETCH_COMICS_BY_CHARACTER_ID_REJECTED = 'comics:ComicsByCharacterIdRejected'
export const FETCHING = 'comics:AjaxCallToFetch';
export const SEARCHING = 'comics:Searching';

export function fetchComicsByCharacterId(id, filter = {}) {
	return (dispatch) => {
		const { total, count, ...newFilterObj } = filter;
		let filterToQueryStringVal = filterToQueryString(newFilterObj);
		let queryString = (filterToQueryStringVal.length) ? `?${filterToQueryStringVal}` : '';
		dispatch({ type: FETCHING });
		axios.get(`${baseUrl}/characters/${id}/comics${queryString}`)
			.then(response => {
				dispatch({ type: FETCH_COMICS_BY_CHARACTER_ID_SUCCESS, payload: response.data});
			})
			.catch(err => {
				dispatch({ type: FETCH_COMICS_BY_CHARACTER_ID_REJECTED, payload: err});
			})
	}
}
