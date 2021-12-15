import axios from './axiosConfig';
import { getAccessToken, getUser } from '../helpers/session';
import { Dispatch } from 'react';
import { setLoading } from '../store/actions/loading';

export const getCourseMembersService = async (
    courseId: string,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));

        const response = await axios({
            url: `/api/courses/${courseId}/members`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
        });

        dispatch(setLoading(false));

        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const addCourseMemberService = async (
    courseId: string,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));
        const uid = getUser().uid;
        const role = getUser().role;

        console.log(courseId, role);

        const response = await axios({
            url: `/api/courses/${courseId}/members/${uid}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                role,
            },
        });

        dispatch(setLoading(false));
        console.log('Course member added successfully');

    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const updateCourseMemberService = async (
    courseId: string,
    role: string,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));
        const uid = getUser().uid;

        const response = await axios({
            url: `/api/courses/${courseId}/members/${uid}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                role,
            },
        });

        dispatch(setLoading(false));

        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};
