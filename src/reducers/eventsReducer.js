import Event from '../objects/events';
import { FETCH_EVENTS_BY_CHARACTER_ID_SUCCESS,
		//FETCH_EVENTS_BY_CHARACTER_ID_REJECTED,
		FETCHING } from '../actions/eventsActions'
export default function(state = {
	collection: [],
	event: {},
	filter:{
		limit: 24
	},
	fetching: true,
	searching: false
}, { type, payload }) {
	switch (type) {
		case FETCH_EVENTS_BY_CHARACTER_ID_SUCCESS:
			return { ...state,
					collection: payload.data.results.map(c => new Event(c)),
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