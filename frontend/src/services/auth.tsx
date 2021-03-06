import axios from './axiosConfig';
import { Dispatch } from 'react';

import {
    getAccessToken,
    getUser,
    isLoggedIn,
    setAccessToken,
    setLogout,
    setUser,
} from '../helpers/session';
import { setUserData, toggleLoggedIn } from '../store/actions';
import { setUserError } from '../store/actions/user';
import checkAccess from '../helpers/token';
import { setLoading } from '../store/actions/loading';

export const googleLogin = async (
    response: any,
    role: string,
    dispatch: Dispatch<any>,
    navigate: any
) => {
    try {
        dispatch(setLoading(true));
        const res = await axios({
            url: '/api/auth/google',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                token: response.accessToken,
                username: response.profileObj.email,
                role: role,
            },
        });

        if (res.status === 200 && !res.data.error) {
            dispatch(setLoading(false));
            setAccessToken(res.data.token);
            setUser(res.data.user);
            dispatch(setUserData(res.data.user));
            dispatch(toggleLoggedIn(true));
            navigate(`/${role}/courses`);
        }
    } catch (err: any) {
        console.log({ err });
        dispatch(setUserError(err.response.data.message));
    }
};

const checkTokens = () => {
    if (
        !isLoggedIn() ||
        checkAccess().isExp ||
        checkAccess().tknData.username !== getUser().username
    )
        setLogout();
};

export const persistLogin = (dispatch: Dispatch<any>, navigate: any) => {
    checkTokens();
    const user = getUser();
    const token = getAccessToken();
    dispatch(setUserData(user));

    if (user && token) {
        dispatch(toggleLoggedIn(true));
    } else {
        navigate('/');
    }
};

// const handleLogout = (dispatch: Dispatch<any>, navigate: any) => {
// 	dispatch(toggleLoggedIn(false));
// 	dispatch(setUserData({}));
// 	setLogout();
// 	navigate('/');
// };
