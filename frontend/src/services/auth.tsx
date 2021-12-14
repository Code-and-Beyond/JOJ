import axios from "./axiosConfig";
import { Dispatch } from "react";

import { getAccessToken, getUser, isLoggedIn, setAccessToken, setLogout, setUser } from "../helpers/session";
import { setUserData, toggleLoggedIn } from "../store/actions";
import { setUserError } from "../store/actions/user";
import checkAccess from "../helpers/token";

export const googleLogin = async (response: any, role: string, dispatch: Dispatch<any>, navigate: any) => {
	try {
		const res = await axios({
			url: '/api/auth/google',
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			data: {
				'token': response.accessToken,
				'username': response.profileObj.email,
				'role': role
			}
		});

		console.log(res);

		if (res.status === 200 && !res.data.error) {
			setAccessToken(res.data.token);
			setUser(res.data.user);
			dispatch(setUserData(res.data.user));
			dispatch(toggleLoggedIn(true));
			navigate('/teacher/courses');
		}
	}
	catch (err: any) {
		console.log({ err });
		dispatch(setUserError(err.response.data.message));
		setTimeout(() => { dispatch(setUserError('')); }, 3000);
	}
};

const checkTokens = () => { if (!isLoggedIn() || checkAccess().isExp || checkAccess().tknData.username !== getUser().username) setLogout(); };

export const persistLogin = (dispatch: Dispatch<any>, navigate: any) => {
	checkTokens();
	const user = getUser();
	const token = getAccessToken();

	if (user && token) {
		dispatch(setUserData(user));
		dispatch(toggleLoggedIn(true));
	}
	else {
		navigate('/');
	}
};

