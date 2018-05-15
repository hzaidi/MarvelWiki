import axios from 'axios'
import { baseUrl } from '../resolvedUrl';
import debounce from 'debounce';
import { filterToQueryString } from '../helper/objectHelper';

export const FETCH_CHARACTERS_SUCCESS = 'characters:GetAll';
export const FETCH_CHARACTERS_REJECTED = 'characters:GetAllRejected';
export const FETCHING = 'characters:AjaxCallToFetch';
export const SEARCHING = 'characters:Searching';
export const FETCH_CHARACTER_BY_ID_SUCCESS = 'character:GetOneById';
export const FETCH_CHARACTER_BY_ID_REJECTED = 'character:Rejected';

export const searchFilterObject = {
	nameStartsWith: '',
	orderBy: 'name',
	modifiedSince: '2010-01-01'
}


export function fetchCharacters(filter) {
	return (dispatch) => {
		dispatch({ type: FETCHING });
		_search({ dispatch, filter })
	}
}

export function filterCharacters(filter) {
	return (dispatch) => {
		dispatch({ type: SEARCHING });
		dispatch({ type: FETCHING });
		_debounceSearch(dispatch, filter);
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

export function onNavigation(filter ,direction = 'next') {
	return (dispatch) => {
		dispatch({ type: FETCHING });
		_onNavigation(dispatch, filter, direction);
	}
}


function _onNavigation(dispatch, filter, direction = 'next') {
	let filterObj;
	if(direction === 'next') {
		filterObj = Object.assign({}, filter, { offset: filter.offset + filter.count })
	} else {
		filterObj = Object.assign({}, filter, { offset: filter.offset - filter.count })
	}
	_search({ dispatch, filter: filterObj });
}

function _search({ dispatch, filter = {} }) {
	const { total, count, ...newFilterObj } = filter;
	let filterToQueryStringVal = filterToQueryString(newFilterObj);
	let queryString = (filterToQueryStringVal.length) ? `?${filterToQueryStringVal}` : '';
	axios.get(`${baseUrl}/characters${queryString}`)
		.then(response => {
			dispatch({ type: FETCH_CHARACTERS_SUCCESS, payload: response.data});
		})
		.catch(err => {
			dispatch({ type: FETCH_CHARACTERS_REJECTED, payload: err});
		})
}

let _debounceSearch = debounce((dispatch, filter) => {
	_search({dispatch, filter})
}, 1000)

