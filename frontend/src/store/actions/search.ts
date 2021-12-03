import * as actionTypes from './actionTypes';

export const setSource = (source: string) => {
	return {
		type: actionTypes.SET_SOURCE,
		payload: { source }
	};
};


export const setDestination = (destination: string) => {
	return {
		type: actionTypes.SET_DESTINATION,
		payload: { destination }
	};
};


export const setJourneyDate = (journeyDate: Date) => {
	return {
		type: actionTypes.SET_JOURNEY_DATE,
		payload: { journeyDate }
	};
};

export const setResults = (allBuses: Array<any>, searchState: any) => {
	const { source, destination, journeyDate } = searchState;
	const results = allBuses.filter((bus: any, index: number) => {
		return bus.source.toLowerCase() === source.toLowerCase()
			&& bus.destination.toLowerCase() === destination.toLowerCase()
			&& bus.startDate.split('T')[0] == journeyDate;
	});
	return {
		type: actionTypes.SET_RESULTS,
		payload: { results }
	};
};