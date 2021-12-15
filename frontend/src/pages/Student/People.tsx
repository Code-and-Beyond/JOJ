import React from 'react';
import { useLocation } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';

type PeopleProps = {

};

const People: React.FC<PeopleProps> = () => {
	const currPath = useLocation().pathname;
	const oneBackPath = currPath.split('/').slice(0, -1).join('/');

	const routeList = [
		{ path: oneBackPath + '/evaluations', title: 'Evaluations' },
		{ path: currPath, title: 'People' },
	];

	return (
		<div>
			<Navbar navList={routeList} />
			<h1>People section.</h1>
		</div>
	);
};
export default People;