import * as actionTypes from './actionTypes';

export const setCourses = (courses: Array<Object>) => {
    return {
        type: actionTypes.SET_COURSES,
        payload: { courses },
    };
};

export const setCurrentCourse = (selectedCourse: Object) => {
    return {
        type: actionTypes.SET_CURRENT_COURSE,
        payload: { selectedCourse },
    };
};
