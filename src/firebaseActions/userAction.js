import firebase from '../firebaseConfig';
const db = firebase.database();

export function updateUserTeamPreference(team, user){
	return db.ref(`usersTeam/${user.uid}`).push({
		team
	})
}
