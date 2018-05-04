import { FETCH_CREATOR_SUCCESS, FETCH_CREATOR_REJECTED } from '../actions/creatorsActions'
export default function(state = {
	creators: {},
	fetching: false
}, { type, payload }) {
	return state;
}