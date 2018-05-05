export default (character) => {
	character.imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`
	return character;
}