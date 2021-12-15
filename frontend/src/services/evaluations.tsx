import axios from './axiosConfig';
import { getAccessToken } from '../helpers/session';
import { Dispatch } from 'react';

export const getCourseEvaluations = async (
    courseId: string,
    dispatch: Dispatch<any>
) => {
    try {
        const response = await axios({
            url: `/courses/${courseId}/evaluations`,
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

export const createCourseEvaluation = async (
    courseId: string,
    evalObj: any,
    dispatch: Dispatch<any>
) => {
    try {
        const response = await axios({
            url: `/api/courses/${courseId}/evaluations`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                ...evalObj,
            },
        });

        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const updateEvaluation = async (
    evaluationId: string,
    evalObj: any,
    dispatch: Dispatch<any>
) => {
    try {
        const response = await axios({
            url: `/api/evaluations/${evaluationId}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                ...evalObj,
            },
        });

        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};
