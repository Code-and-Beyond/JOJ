import axios from './axiosConfig';
import { Dispatch } from 'react';
import { setLoading } from '../store/actions/loading';
import { getAccessToken } from '../helpers/session';

export const addCourseService = async (
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

export const updateCourseMember = async (courseId: string, courseObj: any) => {
    try {
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

        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const getUserCoursesService = async (uid: string) => {
    try {
        const response = await axios({
            url: `/api/users/${uid}/courses`,
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

export const getCourseByInviteCodeService = async (inviteCode: string) => {
    try {
        const response = await axios({
            url: `api/courses/codes/${inviteCode}`,
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
