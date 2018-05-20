
const Comic = (comic) => {
	comic.imageUrl = (size = 'portrait_fantastic') => `${comic.thumbnail.path}/${size}.${comic.thumbnail.extension}`;
	return comic;
}

export default Comic;