import axios from './axiosConfig';
import { getAccessToken, getUser } from '../helpers/session';
import { Dispatch } from 'react';
import { setLoading } from '../store/actions/loading';

type testcaseType = {
    testcaseId: string;
    stdin: string;
    expectedOutput: string;
    isSample: boolean;
};

export const createSubmissionService = async (
    problemId: string,
    submissionObj: any,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));
        const uid = getUser().uid;

        const response = await axios({
            url: `/api/users/${uid}/problems/${problemId}/submissions`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                uid,
                problemId,
                ...submissionObj,
            },
        });

        dispatch(setLoading(false));

        console.log(response);
    } catch (err) {
        console.log(err);
    }
};

export const computeSubmissionResultService = (
    submissions: any[],
    testcases: testcaseType[]
) => {
    console.log('computeSubmissionResultService', submissions);
    const submissionResult = {
        submissionId: submissions[0].token,
        sourceCode: submissions[0].source_code,
        language: submissions[0].language.name,
        creationTime: submissions[0].created_at,
        status: null,
        timeTaken: 0,
        memoryConsumed: 0,
        testcasesPassed: 0,
    };

    let statusId = 0;
    // let testcaseResults = [];

    for (let i = 0; i < submissions.length; ++i) {
        let submissionObj = submissions[i];

        if (statusId < submissionObj.status.id) {
            statusId = submissionObj.status.id;
            submissionResult.status = submissionObj.status.description;
        }

        if (submissionObj.status.description === 'Accepted')
            ++submissionResult.testcasesPassed;

        submissionResult.timeTaken = Math.max(
            submissionResult.timeTaken,
            submissionObj.time
        );
        submissionResult.memoryConsumed = Math.max(
            submissionResult.memoryConsumed,
            submissionObj.memory
        );

        // testcaseResults.push({
        //     submissionId: submissionResult.submissionId,
        //     testcaseId: testcases[i].testcaseId,
        //     stdout: submissionObj.stdout,
        // });
    }

    // createSubmissionService(submissionResult);
    // pushTestcaseResultsToDatabase(testcaseResults);

    return submissionResult;
};
