import Event from '../objects/events';
import { FETCH_EVENTS_BY_CHARACTER_ID_SUCCESS,
		FETCH_EVENT_BY_ID_SUCCESS,
		LOAD_MORE_SUCCESS,
		RESET_STATE,
		FETCHING } from '../actions/eventsActions';

const initialState = () => {
	return {
		collection: [],
		event: {},
		filter:{
			limit: 24
		},
		fetching: true,
		searching: false
	};
}

export default function(state = initialState(), { type, payload }) {
	switch (type) {
		case FETCH_EVENT_BY_ID_SUCCESS:
			return { ...state,
				event: new Event(payload.results[0]),
				fetching: false }
		case FETCH_EVENTS_BY_CHARACTER_ID_SUCCESS:
			return { ...state,
					collection: payload.results.map(c => new Event(c)),
					filter: _payLoadToMetaRecord(payload),
					fetching: false,
					searching: false };
		case LOAD_MORE_SUCCESS:
			return { ...state,
				collection: state.collection.concat(payload.results.map(c => new Event(c))),
				filter: _payLoadToMetaRecord({ ...state.filter, ...payload }),
				fetching: false,
				searching: false }
		case FETCHING:
			return { ...state, fetching: true };
		case RESET_STATE:
			return { ...state, ...initialState() }
		default:
			return state;
	}
}


function _payLoadToMetaRecord(data) {
	const { results, ...meta } = data;
	return meta;
}