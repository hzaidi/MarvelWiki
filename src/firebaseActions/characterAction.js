import firebase from '../firebaseConfig';
const db = firebase.database();

export function onCharacterLike(characterId){
	console.log('Character id i want to like', characterId);

}

export function seedDbWithCharacter(character){
	db.ref(`characters/${character.id}`).once('value').then((snapshot) => {
		if(!snapshot.val()) {
			db.ref(`characters/${character.id}`).set({
				id: character.id,
				name: character.name,
				thumbnail: character.thumbnail
			});
		}
	});
}

export function seedDbWithCharacters(characters) {
	characters.forEach(c => seedDbWithCharacter(c));
}

export function getCharacterById(id) {
	return db.ref(`characters/${id}`).once('value')
}