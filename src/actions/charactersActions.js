import axios from 'axios'
import { baseUrl } from '../resolvedUrl';
import debounce from 'debounce';

export const FETCH_CHARACTERS_SUCCESS = 'characters:GetAll';
export const FETCH_CHARACTERS_REJECTED = 'characters:GetAllRejected';
export const FETCHING = 'characters:AjaxCallToFetch';
export const SEARCHING = 'characters:Searching';
export const FETCH_CHARACTER_BY_ID_SUCCESS = 'character:GetOneById';
export const FETCH_CHARACTER_BY_ID_REJECTED = 'character:Rejected';


const search = ({ dispatch, filter = {} }) => {
	let filterToQueryString = Object.keys(filter).reduce((prev, curr) => {
		if (filter[curr]) { prev.push(`${curr}=${filter[curr]}`) }
		return prev
	}, []).join('&');
	let queryString = (filterToQueryString.length) ? `?${filterToQueryString}` : '';
	axios.get(`${baseUrl}/characters${queryString}`)
		.then(response => {
			dispatch({ type: FETCH_CHARACTERS_SUCCESS, payload: response.data});
		})
		.catch(err => {
			dispatch({ type: FETCH_CHARACTERS_REJECTED, payload: err});
		})
}

const debounceSearch = debounce((dispatch, filter) => {
	search({dispatch, filter})
}, 500);



export function fetchCharacters(filter) {
	return (dispatch) => {
		dispatch({ type: FETCHING });
		search({ dispatch, filter })
	}
}

export function filterCharacters(filter) {
	return (dispatch) => {
		dispatch({ type: SEARCHING })
		debounceSearch(dispatch, filter);
	}
}

export function fetchCharacterById(id) {
	return (dispatch) => {
		dispatch({ type: FETCHING });
		axios.get(`${baseUrl}/characters/${id}`)
			.then(response => {
				dispatch({ type: FETCH_CHARACTER_BY_ID_SUCCESS, payload: response.data});
			})
			.catch(err => {
				dispatch({ type: FETCH_CHARACTER_BY_ID_REJECTED, payload: err});
			})
	}
}