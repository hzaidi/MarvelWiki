import Serial from '../objects/series';
import { FETCH_SERIES_BY_CHARACTER_ID_SUCCESS,
		//FETCH_SERIES_BY_CHARACTER_ID_REJECTED,
		LOAD_MORE_SUCCESS,
		FETCHING } from '../actions/seriesActions'
export default function(state = {
	collection: [],
	serial: {},
	filter:{
		limit: 24
	},
	fetching: true,
	searching: false
}, { type, payload }) {
	switch (type) {
		case FETCH_SERIES_BY_CHARACTER_ID_SUCCESS:
			return { ...state,
					collection: payload.results.map(c => new Serial(c)),
					filter: _payLoadToMetaRecord(payload),
					fetching: false,
					searching: false };
		case LOAD_MORE_SUCCESS:
			return { ...state,
				collection: state.collection.concat(payload.results.map(c => new Serial(c))),
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