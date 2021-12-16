import axios from './axiosConfig';
import { getAccessToken, getUser } from '../helpers/session';
import { Dispatch } from 'react';
import { setLoading } from '../store/actions/loading';
import { calculateUserEvaluationScoreService } from './submission';

export const getReportEntryService = async (
    evaluationId: string,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));
        const uid = getUser().uid;

        const response = await axios({
            url: `/api/reports/${evaluationId}/users/${uid}`,
            method: 'GET',
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

export const addReportEntryService = async (
    evaluationId: string,
    reportEntryObj: any,
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(setLoading(true));
        const uid = getUser().uid;

        const score = await calculateUserEvaluationScoreService(evaluationId, uid);
        reportEntryObj.score = score;

        console.log(score);

        await axios({
            url: `/api/reports/${evaluationId}/users/${uid}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + getAccessToken(),
            },
            data: {
                ...reportEntryObj,
            },
        });

        dispatch(setLoading(false));
    } catch (err: any) {
        console.log(err.stack);
        // throw new Error(err.stack);
    }
};

export const getEvaluationReportService = async (evaluationId: string, dispatch: Dispatch<any>) => {
    try {
        dispatch(setLoading(true));

        const response = await axios({
            url: `/api/reports/${evaluationId}`,
            method: 'GET',
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
}