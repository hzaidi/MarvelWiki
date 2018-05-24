import axios from 'axios'
import { baseUrl } from '../resolvedUrl';
//import debounce from 'debounce';
import { filterToQueryString } from '../helper/objectHelper';

export const FETCH_SERIES_BY_CHARACTER_ID_SUCCESS = 'series:SeriesByCharacterId'
export const FETCH_SERIES_BY_CHARACTER_ID_REJECTED = 'series:SeriesByCharacterIdRejected'
export const FETCHING = 'series:AjaxCallToFetch';
export const SEARCHING = 'series:Searching';

export function fetchSeriesByCharacterId(id, filter = {}) {
	return (dispatch) => {
		const { total, count, ...newFilterObj } = filter;
		let filterToQueryStringVal = filterToQueryString(newFilterObj);
		let queryString = (filterToQueryStringVal.length) ? `?${filterToQueryStringVal}` : '';
		dispatch({ type: FETCHING });
		axios.get(`${baseUrl}/characters/${id}/series${queryString}`)
			.then(response => {
				dispatch({ type: FETCH_SERIES_BY_CHARACTER_ID_SUCCESS, payload: response.data});
			})
			.catch(err => {
				dispatch({ type: FETCH_SERIES_BY_CHARACTER_ID_REJECTED, payload: err});
			})
	}
}
