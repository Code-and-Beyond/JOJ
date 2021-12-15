import axios from './axiosConfig';
import { getAccessToken } from '../helpers/session';

export const getCourseMembers = async (courseId: string) => {
    try {
        const response = await axios({
            url: `/api/courses/${courseId}/members`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
        });

        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const addCourseMember = async (
    courseId: string,
    uid: string,
    role: string
) => {
    try {
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

        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const updateCourseMember = async (
    courseId: string,
    uid: string,
    role: string
) => {
    try {
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

        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};
