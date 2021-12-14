import axios from './axiosConfig';
import { getAccessToken } from '../helpers/session';
import { getProblemTestcasesService } from './testcases';

export const getTestProblemsService = async (contestId: string) => {
    try {
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
                problem.problemId
            );
            resultObj.push({
                ...problem,
                testcases,
            });
        }

        return resultObj;
    } catch (err) {
        console.log(err);
    }
};

export const createTestProblemService = async (
    contestId: string,
    problemObj: any
) => {
    try {
        const response = await axios({
            url: `/api/contests/${contestId}/problems`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                name: problemObj.name,
                statement: problemObj.statement,
                input: problemObj.input,
                output: problemObj.output,
                constraints: problemObj.constraints,
                timeLimit: problemObj.timeLimit,
                memoryLimit: problemObj.memoryLimit,
                explanation: problemObj.explanation,
            },
        });

        console.log(response);
    } catch (err) {
        console.log(err);
    }
};
