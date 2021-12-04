import {
	SET_BOOKING_SEATS,
	SET_PASSENGERS_DETAIL
} from "../actions/actionTypes";

const initialState = {
	busId: '',
	totalFare: 0,
	bookedSeats: [],
	passengers: []
};

const bookingReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case SET_BOOKING_SEATS:
			return {
				...state,
				busId: action.payload.busId,
				totalFare: action.payload.fare,
				bookedSeats: action.payload.bookedSeats
			};
		case SET_PASSENGERS_DETAIL:
			return {
				...state,
				passengers: action.payload.passengersDetail
			};
		default:
			return state;
	}
};

export default bookingReducer;