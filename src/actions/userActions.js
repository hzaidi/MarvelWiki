import { auth, provider } from '../firebaseConfig';
export const LOGIN = 'user:Login';
export const LOGOUT = 'user:Logout';



export function checkAuthentication() {
	return (dispatch) => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				const { uid, displayName } = user;
				dispatch({ type: LOGIN, payload: { uid, displayName } });
			}
		});
	}
}

export function login() {
	return (dispatch) => {
		return auth.signInWithPopup(provider).then((result) => {
			const { uid, displayName } = result.user;
			dispatch({ type: LOGIN, payload: { uid, displayName } });
		});
	}
}


export function logout() {
	return (dispatch) => {
		return auth.signOut().then(() => {
			dispatch({ type: LOGOUT });
		});
	}
}