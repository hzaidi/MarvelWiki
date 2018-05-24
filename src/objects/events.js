
const Event = (event) => {
	event.imageUrl = (size = 'portrait_fantastic') => `${event.thumbnail.path}/${size}.${event.thumbnail.extension}`;
	return event;
}

export default Event;