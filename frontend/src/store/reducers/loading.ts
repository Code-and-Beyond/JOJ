import { SET_LOADING } from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: '',
};

const loadingReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload.loading,
            };
        default:
            return state;
    }
};

export default loadingReducer;
