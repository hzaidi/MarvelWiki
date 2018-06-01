const Comic = (comic) => {
	comic.imageUrl = (size = null) => {
		if(size === null) {
			return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
		}else{
			return `${comic.thumbnail.path}/${size}.${comic.thumbnail.extension}`;
		}
	}

	comic.imagesUrl = comic.images.map(image => `${image.path}.${image.extension}`)

	return comic;
}

export default Comic;