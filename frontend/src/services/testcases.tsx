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
                testcaseId: testcaseObj.testcaseId,
                stdin: testcaseObj.stdin,
                expectedOutput: testcaseObj.expectedOutput,
                isSample: testcaseObj.isSample,
            },
        });

        console.log(response);
    } catch (err) {
        console.log(err);
    }
};
