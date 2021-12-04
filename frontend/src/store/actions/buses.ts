import * as actionTypes from './actionTypes';


export const fetchBusesStart = () => {
	return {
		type: actionTypes.FETCH_BUSES_START,
	};
};

export const setBuses = (buses: Array<Object>) => {
	return {
		type: actionTypes.SET_BUSES,
		payload: { buses }
	};
};


export const fetchBusesEnd = () => {
	return {
		type: actionTypes.FETCH_BUSES_END,
	};
};
