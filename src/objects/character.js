const Character = (character) => {
	character.imageUrl = (size = 'portrait_fantastic') => `${character.thumbnail.path}/${size}.${character.thumbnail.extension}`;
	return character;
}

export default Character;