import {
	TOGGLE_LOGGED_IN,
	SET_USER_INFO,
	SET_USER_ERROR
} from "../actions/actionTypes";

const initialState = {
	loggedIn: false,
	error: '',
	info: {}
};

const userReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case TOGGLE_LOGGED_IN:
			return {
				...state,
				loggedIn: action.payload.loggedIn,
			};
		case SET_USER_INFO:
			return {
				...state,
				info: action.payload.userInfo
			};
		case SET_USER_ERROR:
			return {
				...state,
				error: action.payload.errorMessage
			};
		default:
			return state;
	}
};

export default userReducer;