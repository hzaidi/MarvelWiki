const Character = (character) => {
	character.imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
	return character;
}

export default Character;