import axios from './axiosConfig';
import { getAccessToken } from '../helpers/session';
import { Dispatch } from 'react';
import { setLoading } from '../store/actions/loading';

export const getProblemTestcasesService = async (
    problemId: string,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));

        const response = await axios({
            url: `/api/problems/${problemId}/testcases`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
        });

        dispatch(setLoading(false));

        return response.data.testcases;
    } catch (err) {
        console.log(err);
    }
};

export const createProblemTestcaseService = async (
    problemId: string,
    testcaseObj: any,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));

        const response = await axios({
            url: `/api/problems/${problemId}/testcases`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                ...testcaseObj,
            },
        });

        dispatch(setLoading(false));

        console.log(response);
    } catch (err) {
        console.log(err);
    }
};

export const updateTestcaseService = async (
    testcaseId: string,
    testcaseObj: any,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));

        const response = await axios({
            url: `/api/testcases/${testcaseId}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                ...testcaseObj,
            },
        });

        dispatch(setLoading(false));

        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const deleteTestcaseService = async (
    testcaseId: string,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));

        const response = await axios({
            url: `/api/testcases/${testcaseId}`,
            method: 'DELETE',
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
