import axios from 'axios'

export const FETCH_CHARACTERS_SUCCESS = 'characters:GetAll';
export const FETCH_CHARACTERS_REJECTED = 'characters:GetAllRejected';

export function fetchAllCharacters() {
	return (dispatch) => {
		axios.get('https://marvelapi-hwlmegsvia.now.sh/characters')
			.then(response => {
				dispatch({ type: FETCH_CHARACTERS_SUCCESS, payload: response.data});
			})
			.catch(err => {
				dispatch({ type: FETCH_CHARACTERS_REJECTED, payload: err});
			})
	}
}
