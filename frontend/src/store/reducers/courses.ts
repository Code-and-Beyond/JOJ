import { SET_COURSES, SET_CURRENT_COURSE } from '../actions/actionTypes';

const initialState = {
    courses: [],
    currentCourse: {},
};

const courseReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_COURSES:
            return {
                ...state,
                courses: action.payload.courses,
            };
        case SET_CURRENT_COURSE:
            return {
                ...state,
                currentCourse: action.payload.selectedCourse,
            };
        default:
            return state;
    }
};

export default courseReducer;
