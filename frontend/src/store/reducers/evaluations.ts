import {
    SET_CURRENT_EVALUATION,
    SET_EVALUATIONS,
} from '../actions/actionTypes';

const initialState = {
    evaluations: [],
    currentEvalution: {},
};

const evalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_EVALUATIONS:
            return {
                ...state,
                evaluations: action.payload.evaluations,
            };
        case SET_CURRENT_EVALUATION:
            return {
                ...state,
                currentEvalution: action.payload.selectedEvaluation,
            };
        default:
            return state;
    }
};

export default evalReducer;
