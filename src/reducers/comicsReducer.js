import Comic from '../objects/comics';
import { FETCH_COMICS_BY_CHARACTER_ID_SUCCESS,
		FETCH_COMICS_BY_CHARACTER_ID_REJECTED,
		FETCHING } from '../actions/comicsActions'
export default function(state = {
	comics: [],
	comic: {},
	metaRecord: { limit: 12 }, //Keep the track of 'Total Records', 'Limit', 'Offset' for more fetching
	fetching: true,
	searching: false
}, { type, payload }) {
	switch (type) {
		case FETCH_COMICS_BY_CHARACTER_ID_SUCCESS:
			return { ...state,
					comics: payload.data.results.map(c => new Comic(c)),
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