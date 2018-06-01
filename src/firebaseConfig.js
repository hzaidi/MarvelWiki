import firebase from 'firebase'
const config = {
	apiKey: "AIzaSyA5YZCq9dOgl3KZoc-CaUzkkoCfDKRG7F0",
    authDomain: "marvelwiki-1525787284684.firebaseapp.com",
    databaseURL: "https://marvelwiki-1525787284684.firebaseio.com",
    projectId: "marvelwiki-1525787284684",
    storageBucket: "marvelwiki-1525787284684.appspot.com",
    messagingSenderId: "284797959948"
};
firebase.initializeApp(config);

export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();