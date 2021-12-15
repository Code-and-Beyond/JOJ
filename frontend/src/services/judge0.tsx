import axios from 'axios';
import { computeSubmissionResultService } from './submission';

type languageIdsTypes = {
    [languageName: string]: number;
};

const languageIds: languageIdsTypes = {
    C: 50,
    'C++': 54,
    Java: 62,
    Python: 71,
};

type testcaseType = {
    testcaseId: string;
    stdin: string;
    expectedOutput: string;
    isSample: boolean;
};

const getMinStatusId = (submissions: any[]) => {
    let minStatusId = 100;
    for (let submission of submissions) {
        minStatusId = Math.min(minStatusId, submission.status.id);
    }
    return minStatusId;
};

export const createJudgeSubmissionService = async (submissionObj: any) => {
    try {
        let options: any = {
            method: 'POST',
            url: `https://${process.env.REACT_APP_RAPID_API_HOST}/submissions`,
            params: { base64_encoded: 'false', fields: '*' },
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
            },
            data: {
                language_id: languageIds[submissionObj.languageName],
                source_code: submissionObj.sourceCode,
                stdin: submissionObj.stdin,
                expected_output: submissionObj.expectedOutput,
            },
        };

        const response = await axios.request(options);
        console.log(response.data);
        return response.data.token;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const getJudgeSubmissionService = async (submissionToken: string) => {
    try {
        var options: any = {
            method: 'GET',
            url: `https://${process.env.REACT_APP_RAPID_API_HOST}/submissions/${submissionToken}`,
            params: { base64_encoded: 'false', fields: '*' },
            headers: {
                'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
            },
        };

        const response = await axios.request(options);
        console.log(response);
        return response.data;
    } catch (err: any) {
        throw new Error(err.stack);
    }
};

export const createJudgeSubmissionBatchService = async (
    submissionsArray: any[]
) => {
    try {
        let submissions = [];
        for (let submissionObj of submissionsArray) {
            submissions.push({
                language_id: languageIds[submissionObj.languageName],
                source_code: submissionObj.sourceCode,
                stdin: submissionObj.stdin,
                expected_output: submissionObj.expectedOutput,
            });
        }

        let options: any = {
            method: 'POST',
            url: `https://${process.env.REACT_APP_RAPID_API_HOST}/submissions/batch`,
            params: { base64_encoded: 'false' },
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
            },
            data: {
                submissions,
            },
        };

        const response = await axios.request(options);
        console.log(response);
        let submissionTokens = [];
        for (let submissionObj of response.data)
            submissionTokens.push(submissionObj.token);
        return submissionTokens;
    } catch (err: any) {
        throw new Error(err);
    }
};

export const getJudgeSubmissionBatchService = async (
    submissionTokens: any[]
) => {
    try {
        let submissionTokenString = '';
        for (let submissionToken of submissionTokens) {
            submissionTokenString += submissionToken + ',';
        }
        submissionTokenString = submissionTokenString.slice(
            0,
            submissionTokenString.length - 1
        );

        let options: any = {
            method: 'GET',
            url: `https://${process.env.REACT_APP_RAPID_API_HOST}/submissions/batch`,
            params: {
                tokens: submissionTokenString,
                base64_encoded: 'false',
                fields: '*',
            },
            headers: {
                'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
            },
        };

        const response = await axios.request(options);
        console.log(response);
        return response.data.submissions;
    } catch (err: any) {
        throw new Error(err);
    }
};

export const runCodeService = async (
    languageName: string,
    sourceCode: string,
    stdin: string,
    expectedOutput: string
) => {
    try {
        const submissionObj = {
            languageName,
            sourceCode,
            stdin,
            expectedOutput,
        };

        const submissionToken = await createJudgeSubmissionService(
            submissionObj
        );
        const submission = await getJudgeSubmissionService(submissionToken);
        return submission;
    } catch (err) {
        console.log(err);
    }
};

export const submitCodeService = async (
    testcases: testcaseType[],
    languageName: string,
    sourceCode: string
) => {
    let submissionsArray = [];
    for (let testcase of testcases) {
        submissionsArray.push({
            languageName,
            sourceCode,
            ...testcase,
        });
    }

    try {
        const submissionTokens = await createJudgeSubmissionBatchService(
            submissionsArray
        );
        let submissions = null;
        do {
            submissions = await getJudgeSubmissionBatchService(
                submissionTokens
            );
        } while (getMinStatusId(submissions) <= 2);
        console.log(submissions);
        if (submissions) {
            const submissionResult = computeSubmissionResultService(
                submissions,
                testcases
            );
            return { submissionResult, submission: submissions[0] };
        }
    } catch (error) {
        console.log(error);
    }
};