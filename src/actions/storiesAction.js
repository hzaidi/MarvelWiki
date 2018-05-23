import axios from 'axios'
import { baseUrl } from '../resolvedUrl';
import debounce from 'debounce';
import { filterToQueryString } from '../helper/objectHelper';

export const FETCH_STORIES_BY_CHARACTER_ID_SUCCESS = 'stories:ComicsByCharacterId'
export const FETCH_STORIES_BY_CHARACTER_ID_REJECTED = 'stories:ComicsByCharacterIdRejected'
export const FETCHING = 'stories:AjaxCallToFetch';
export const SEARCHING = 'stories:Searching';

export function fetchStoriesByCharacterId(id, filter = {}) {
	return (dispatch) => {
		const { total, count, ...newFilterObj } = filter;
		let filterToQueryStringVal = filterToQueryString(newFilterObj);
		let queryString = (filterToQueryStringVal.length) ? `?${filterToQueryStringVal}` : '';
		dispatch({ type: FETCHING });
		axios.get(`${baseUrl}/characters/${id}/stories${queryString}`)
			.then(response => {
				dispatch({ type: FETCH_STORIES_BY_CHARACTER_ID_SUCCESS, payload: response.data});
			})
			.catch(err => {
				dispatch({ type: FETCH_STORIES_BY_CHARACTER_ID_REJECTED, payload: err});
			})
	}
}
