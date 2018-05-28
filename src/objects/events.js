
const Event = (event) => {
	event.imageUrl = (size = null) => {
		if(size === null) {
			return `${event.thumbnail.path}.${event.thumbnail.extension}`;
		}else{
			return `${event.thumbnail.path}/${size}.${event.thumbnail.extension}`;
		}
	}
	return event;
}

export default Event;