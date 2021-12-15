import axios from './axiosConfig';
import { Dispatch } from 'react';
import { setLoading } from '../store/actions/loading';
import { getAccessToken, getUser } from '../helpers/session';
import { setCourses } from '../store/actions';

export const addCourseService = async (
    uid: string,
    course: any,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));

        await axios({
            url: '/api/courses',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                uid,
                name: course.name,
                subjectCode: course.code,
                degree: course.degree,
                branch: course.branch,
                year: course.year,
                batch: course.batch,
            },
        });

        console.log('Course added successfully');

        dispatch(setLoading(false));
    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const updateCourseService = async (
    courseId: string,
    courseObj: any,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));

        const response = await axios({
            url: `/api/courses/${courseId}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                ...courseObj,
            },
        });

        dispatch(setLoading(false));

        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const getUserCoursesService = async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setLoading(true));
        const uid = getUser().uid;

        const response = await axios({
            url: `/api/users/${uid}/courses`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
        });

        dispatch(setLoading(false));
        dispatch(setCourses(response.data.courses));
    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const getCourseByInviteCodeService = async (
    inviteCode: string,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));

        const response = await axios({
            url: `api/courses/codes/${inviteCode}`,
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
