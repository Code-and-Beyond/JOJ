import * as actionTypes from './actionTypes';

export const setLoading = (loading: boolean) => {
    return {
        type: actionTypes.SET_LOADING,
        payload: { loading },
    };
};
