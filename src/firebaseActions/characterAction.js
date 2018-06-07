import firebase from '../firebaseConfig';
const db = firebase.database();

export const likesRef = db.ref(`likesToCharacter/`);
export const lovesRef = db.ref(`lovesToCharacter/`);
export const dislikesRef = db.ref(`dislikesToCharacter/`);

export function onCharacterLike(characterId, user){
	return _updateUserActionOnAResourceToFireBase({ resource: 'likesToCharacter', characterId, user });
}

export function onCharacterlove(characterId, user){
	return _updateUserActionOnAResourceToFireBase({ resource: 'lovesToCharacter', characterId, user });
}

export function onCharacterDislike(characterId, user){
	return _updateUserActionOnAResourceToFireBase({ resource: 'dislikesToCharacter', characterId, user });
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


function _updateUserActionOnAResourceToFireBase({ resource, characterId, user }) {
	return db.ref(`${resource}/${characterId}`).orderByChild("id").equalTo(user.uid).once('value', function(snapshot){
		var exists = (snapshot.val() !== null)
		if(exists) {
			return snapshot.ref.remove();
		}
		else{
			return db.ref(`${resource}/${characterId}`).push({
				id: user.uid,
				displayName: user.displayName
			});
		}
	})
}



