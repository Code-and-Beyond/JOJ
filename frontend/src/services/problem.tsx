import axios from './axiosConfig';
import { getAccessToken } from '../helpers/session';
import { getProblemTestcasesService } from './testcases';
import { Dispatch } from 'react';
import { setLoading } from '../store/actions/loading';

export const getTestProblemsService = async (
    contestId: string,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));

        const response = await axios({
            url: `/api/contests/${contestId}/problems`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
        });

        let resultObj = [];
        const problems = response.data.problems;
        for (let problem of problems) {
            const testcases = await getProblemTestcasesService(
                problem.problemId,
                dispatch
            );
            resultObj.push({
                ...problem,
                testcases,
            });
        }

        dispatch(setLoading(false));

        return resultObj;
    } catch (err) {
        console.log(err);
    }
};

export const createTestProblemService = async (
    contestId: string,
    problemObj: any,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));

        const response = await axios({
            url: `/api/contests/${contestId}/problems`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                ...problemObj,
            },
        });

        dispatch(setLoading(false));

        console.log(response);
    } catch (err) {
        console.log(err);
    }
};

export const updateProblemService = async (
    problemId: string,
    problemObj: any,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));

        const response = await axios({
            url: `/api/problems/${problemId}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                ...problemObj,
            },
        });

        dispatch(setLoading(false));

        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};
