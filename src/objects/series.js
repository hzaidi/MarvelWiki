
const Serial = (serial) => {
	serial.imageUrl = (size = null) => {
		if(size === null) {
			return `${serial.thumbnail.path}.${serial.thumbnail.extension}`;
		}else{
			return `${serial.thumbnail.path}/${size}.${serial.thumbnail.extension}`;
		}
	}
	return serial;
}

export default Serial;