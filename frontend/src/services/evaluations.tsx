import axios from './axiosConfig';
import { getAccessToken } from '../helpers/session';
import { Dispatch } from 'react';
import { setLoading } from '../store/actions/loading';
import { setEvaluations } from '../store/actions';

export const getCourseEvaluations = async (
    courseId: string,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));

        const response = await axios({
            url: `/api/courses/${courseId}/evaluations`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
        });

        console.log(response.data);
        dispatch(setLoading(false));
        dispatch(setEvaluations(response.data.evaluations));

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
        dispatch(setLoading(true));

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

        console.log('Course evaluation created successfully');
        dispatch(setLoading(false));

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
