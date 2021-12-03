import {
	SET_SOURCE,
	SET_DESTINATION,
	SET_JOURNEY_DATE,
	SET_RESULTS
} from "../actions/actionTypes";

const date = new Date();

const initialState = {
	source: '',
	destination: '',
	journeyDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay(),
	results: []
};

const searchReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case SET_SOURCE:
			return {
				...state,
				source: action.payload.source
			};
		case SET_DESTINATION:
			return {
				...state,
				destination: action.payload.destination
			};
		case SET_JOURNEY_DATE:
			return {
				...state,
				journeyDate: action.payload.journeyDate
			};
		case SET_RESULTS:
			return {
				...state,
				results: action.payload.results
			};
		default:
			return state;
	}
};

export default searchReducer;