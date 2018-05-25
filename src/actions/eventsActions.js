import axios from 'axios'
import { baseUrl } from '../resolvedUrl';
//import debounce from 'debounce';
import { filterToQueryString } from '../helper/objectHelper';

export const FETCH_EVENTS_BY_CHARACTER_ID_SUCCESS = 'events:SeriesByCharacterId'
export const FETCH_EVENTS_BY_CHARACTER_ID_REJECTED = 'events:SeriesByCharacterIdRejected'
export const FETCHING = 'events:AjaxCallToFetch';
export const SEARCHING = 'events:Searching';

export function fetchEventsByCharacterId(id, filter = {}) {
	return (dispatch) => {
		const { total, count, ...newFilterObj } = filter;
		let filterToQueryStringVal = filterToQueryString(newFilterObj);
		let queryString = (filterToQueryStringVal.length) ? `?${filterToQueryStringVal}` : '';
		dispatch({ type: FETCHING });
		return axios.get(`${baseUrl}/characters/${id}/events${queryString}`)
			.then(response => {
				dispatch({ type: FETCH_EVENTS_BY_CHARACTER_ID_SUCCESS, payload: response.data});
			})
			.catch(err => {
				dispatch({ type: FETCH_EVENTS_BY_CHARACTER_ID_REJECTED, payload: err});
			})
	}
}
