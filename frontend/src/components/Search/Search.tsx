import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSource, setDestination, setJourneyDate } from '../../store/actions';
import { RootState } from '../../store/reducers/root';
import FillButton from '../Button/Fill';

type SearchProps = {
	text: string;
	handleSearch: React.MouseEventHandler<HTMLDivElement>;
	extraStyle?: string;
};

const Search: React.FC<SearchProps> = (props) => {
	// const d = new Date();
	// var formatedDate = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
	const dispatch = useDispatch();

	const source = useSelector((state: RootState) => state.srch.source);
	const destination = useSelector((state: RootState) => state.srch.destination);
	const journeyDate = useSelector((state: RootState) => state.srch.journeyDate);


	const getClasses = () => {
		let classes = ["search card"];

		if (props.extraStyle) classes.push(props.extraStyle);
		return classes.join(" , ");
	};

	return (
		<div className={getClasses()}>
			<input type='text' value={source} placeholder='Leaving from' autoComplete="on" onChange={(e: any) => dispatch(setSource(e.target.value))} />
			<input type='text' value={destination} placeholder='Going to' onChange={(e: any) => dispatch(setDestination(e.target.value))} />
			<input type='date' value={journeyDate} placeholder='Going to' onChange={(e: any) => dispatch(setJourneyDate(e.target.value))} />
			<FillButton type={2} text={props.text} onClickHandler={props.handleSearch} />
		</div>
	);
};
export default Search;