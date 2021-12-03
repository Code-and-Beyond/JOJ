import {
	SET_BUSES,
	FETCH_BUSES_START,
	FETCH_BUSES_END
} from "../actions/actionTypes";

const initialState = {
	buses: [],
	fetching: false
};

const busReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case FETCH_BUSES_START:
			return {
				...state,
				fetching: true
			};
		case SET_BUSES:
			return {
				...state,
				buses: action.payload.buses
			};
		case FETCH_BUSES_END:
			return {
				...state,
				fetching: false
			};
		default:
			return state;
	}
};

export default busReducer;