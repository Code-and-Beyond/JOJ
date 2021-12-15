import axios from './axiosConfig';
import { getAccessToken } from '../helpers/session';

export const getProblemTestcasesService = async (problemId: string) => {
    try {
        const response = await axios({
            url: `/api/problems/${problemId}/testcases`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
        });

        return response.data.testcases;
    } catch (err) {
        console.log(err);
    }
};

export const createProblemTestcaseService = async (
    problemId: string,
    testcaseObj: any
) => {
    try {
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

        console.log(response);
    } catch (err) {
        console.log(err);
    }
};

export const updateTestcaseService = async (
    testcaseId: string,
    testcaseObj: any
) => {
    try {
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

        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const deleteTestcaseService = async (testcaseId: string) => {
    try {
        const response = await axios({
            url: `/api/testcases/${testcaseId}`,
            method: 'PUT',
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
