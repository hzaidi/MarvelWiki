import axios from 'axios'

export const FETCH_CREATOR_SUCCESS = 'creator:GetAll';
export const FETCH_CREATOR_REJECTED = 'creator:GetAllRejected';

export function fetchAllCreators() {
	return (dispatch) => {
		axios.get('https://marvelapi-hwlmegsvia.now.sh/creators')
			.then(response => {
				dispatch({ type: FETCH_CREATOR_SUCCESS, payload: response.data});
			})
			.catch(err => {
				dispatch({ type: FETCH_CREATOR_REJECTED, payload: err});
			})
	}
}
