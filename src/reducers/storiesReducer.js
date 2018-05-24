import Comic from '../objects/comics';
import { FETCH_STORIES_BY_CHARACTER_ID_SUCCESS,
		//FETCH_STORIES_BY_CHARACTER_ID_REJECTED,
		FETCHING } from '../actions/storiesAction'
export default function(state = {
	collection: [],
	story: {},
	filter:{
		limit: 24
	},
	fetching: true,
	searching: false
}, { type, payload }) {
	switch (type) {
		case FETCH_STORIES_BY_CHARACTER_ID_SUCCESS:
			return { ...state,
					collection: payload.data.results.map(c => new Comic(c)),
					metaRecord: _payLoadToMetaRecord(payload.data),
					fetching: false,
					searching: false };
		case FETCHING:
			return { ...state, fetching: true };
		default:
			return state;
	}
}


function _payLoadToMetaRecord(data) {
	const { results, ...meta } = data;
	return meta;
}