import axios from 'axios'
import { baseUrl } from '../resolvedUrl';
import debounce from 'debounce';

export const FETCH_CHARACTERS_SUCCESS = 'characters:GetAll';
export const FETCH_CHARACTERS_REJECTED = 'characters:GetAllRejected';
export const FETCHING = 'characters:Fetching';
export const SEARCH_CHARACTER_SUCCESS = 'character:Search';
export const SEARCH_CHARACTER_REJECTED = 'character:SearchRejected';
export const SEARCHING = 'character:Searching';


const debounceSearch = debounce((dispatch, searchText) => {
	let queryString = (searchText.length) ? `?nameStartsWith=${searchText}` : '';
	axios.get(`${baseUrl}/characters${queryString}`)
		.then(response => {
			dispatch({ type: SEARCH_CHARACTER_SUCCESS, payload: response.data});
		})
		.catch(err => {
			dispatch({ type: SEARCH_CHARACTER_REJECTED, payload: err});
		})
}, 1000);

export function fetchCharacters() {
	return (dispatch) => {
		dispatch({ type: FETCHING });
		axios.get(`${baseUrl}/characters`)
			.then(response => {
				dispatch({ type: FETCH_CHARACTERS_SUCCESS, payload: response.data});
			})
			.catch(err => {
				dispatch({ type: FETCH_CHARACTERS_REJECTED, payload: err});
			})
	}
}


export function searchCharacter(searchText) {
	return (dispatch) => {
		dispatch({ type: SEARCHING })
		debounceSearch(dispatch, searchText);
	}
}