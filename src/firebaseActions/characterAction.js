import firebase from '../firebaseConfig';
const db = firebase.database();

export const likesRef = db.ref(`likesToCharacter/`);
export const lovesRef = db.ref(`lovesToCharacter/`);
export const dislikesRef = db.ref(`dislikesToCharacter/`);

export function onCharacterLike(characterId, user){
	return db.ref(`likesToCharacter/${characterId}`).push({
		id: user.uid,
		displayName: user.displayName
	});
}

export function onCharacterlove(characterId, user){
	return db.ref(`lovesToCharacter/${characterId}`).push({
		id: user.uid,
		displayName: user.displayName
	});
}

export function onCharacterDislike(characterId, user){
	return db.ref(`dislikesToCharacter/${characterId}`).push({
		id: user.uid,
		displayName: user.displayName
	});
}

export function seedDbWithCharacter(character){
	return db.ref(`characters/${character.id}`).once('value').then((snapshot) => {
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