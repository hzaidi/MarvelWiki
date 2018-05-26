import Comic from '../objects/comics';
import { FETCH_COMICS_BY_CHARACTER_ID_SUCCESS,
		//FETCH_COMICS_BY_CHARACTER_ID_REJECTED,
		UPDATE_FILTERS,
		LOAD_MORE_SUCCESS,
		FETCHING } from '../actions/comicsActions'
export default function(state = {
	collection: [],
	comic: {},
	filter:{
		limit: 24,
		offset: 0,
		total: 0
	},
	fetching: true,
	searching: false
}, { type, payload }) {
	switch (type) {
		case FETCH_COMICS_BY_CHARACTER_ID_SUCCESS:
			return { ...state,
					collection: payload.data.results.map(c => new Comic(c)),
					filter: _payLoadToMetaRecord(payload.data),
					fetching: false,
					searching: false };
		case LOAD_MORE_SUCCESS:
			return { ...state,
				collection: state.collection.concat(payload.data.results.map(c => new Comic(c))),
				filter: _payLoadToMetaRecord({ ...state.filter, ...payload.data }),
				fetching: false,
				searching: false }
		case FETCHING:
			return { ...state, fetching: true };
		case UPDATE_FILTERS:
			return { ...state,
				filter: payload
			}
		default:
			return state;
	}
}


function _payLoadToMetaRecord(data) {
	const { results, ...meta } = data;
	return meta;
}