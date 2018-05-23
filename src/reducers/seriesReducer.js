import Comic from '../objects/comics';
import { FETCH_SERIES_BY_CHARACTER_ID_SUCCESS,
		FETCH_SERIES_BY_CHARACTER_ID_REJECTED,
		FETCHING } from '../actions/seriesActions'
export default function(state = {
	series: [],
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
					series: payload.data.results.map(c => new Comic(c)),
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