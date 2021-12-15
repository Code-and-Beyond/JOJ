import * as actionTypes from './actionTypes';

export const setEvaluations = (evaluations: Array<Object>) => {
    return {
        type: actionTypes.SET_EVALUATIONS,
        payload: { evaluations },
    };
};

export const setCurrentEvaluation = (selectedEvaluation: Object) => {
    return {
        type: actionTypes.SET_CURRENT_EVALUATION,
        payload: { selectedEvaluation },
    };
};
