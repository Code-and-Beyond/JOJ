import * as actionTypes from './actionTypes';

export const toggleLoggedIn = (loggedIn: boolean) => {
	return {
		type: actionTypes.TOGGLE_LOGGED_IN,
		payload: { loggedIn }
	};
};


export const setUserData = (userInfo: Object) => {
	return {
		type: actionTypes.SET_USER_INFO,
		payload: { userInfo }
	};
};


export const setUserError = (errorMessage: string) => {
	return {
		type: actionTypes.SET_USER_ERROR,
		payload: { errorMessage }
	};
};