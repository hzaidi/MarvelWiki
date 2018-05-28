
const Character = (character) => {
	character.imageUrl = (size = null) => {
		if(size === null) {
			return `${character.thumbnail.path}.${character.thumbnail.extension}`;
		}else{
			return `${character.thumbnail.path}/${size}.${character.thumbnail.extension}`;
		}
	}
	return character;
}

export default Character;