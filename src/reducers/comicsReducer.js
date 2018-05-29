import Comic from '../objects/comics';
import { FETCH_COMICS_BY_CHARACTER_ID_SUCCESS,
		FETCH_COMICS_BY_ID_SUCCESS,
		LOAD_MORE_SUCCESS,
		FETCHING } from '../actions/comicsActions'
export default function(state = {
	collection: [],
	comic: {},
	filter:{
		limit: 24,
		offset: 0,
		total: 0,
		count: 0
	},
	fetching: true,
	searching: false
}, { type, payload }) {
	switch (type) {
		case FETCH_COMICS_BY_ID_SUCCESS:
			return { ...state,
				comic: new Comic(payload.results[0]),
				fetching: false }
		case FETCH_COMICS_BY_CHARACTER_ID_SUCCESS:
			return { ...state,
					collection: payload.results.map(c => new Comic(c)),
					filter: _payLoadToMetaRecord({ ...state.filter, ...payload }),
					fetching: false,
					searching: false };
		case LOAD_MORE_SUCCESS:
			return { ...state,
				collection: state.collection.concat(payload.results.map(c => new Comic(c))),
				filter: _payLoadToMetaRecord({ ...state.filter, ...payload }),
				fetching: false,
				searching: false }
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