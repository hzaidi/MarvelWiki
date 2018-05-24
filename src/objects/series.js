
const Serial = (serial) => {
	serial.imageUrl = (size = 'portrait_fantastic') => `${serial.thumbnail.path}/${size}.${serial.thumbnail.extension}`;
	return serial;
}

export default Serial;