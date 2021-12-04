import * as actionTypes from './actionTypes';

export const setBookingSeats = (busId: string, bookedSeats: number[], fare: number) => {
	return {
		type: actionTypes.SET_BOOKING_SEATS,
		payload: { busId, bookedSeats, fare }
	};
};


export const setPassengersDetail = (passengersDetail: [any]) => {
	return {
		type: actionTypes.SET_PASSENGERS_DETAIL,
		payload: { passengersDetail }
	};
};