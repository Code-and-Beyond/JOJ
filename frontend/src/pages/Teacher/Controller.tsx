import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.component';
import { Outlet } from 'react-router';

type TeacherControllerProps = {

};

const TeacherController: React.FC<TeacherControllerProps> = () => {
	const sidebarList = [
		{
			path: '/dashboard',
			title: 'Dashboard'
		},
		{
			path: '/courses',
			title: 'Courses'
		}, {
			path: '/clubs',
			title: 'Clubs'
		}
	];


	return (
		<div className='teacher'>
			<Sidebar list={sidebarList} initRoute='/teacher' />
			{/* to render child elements */}
			<Outlet />
		</div>
	);
};

export default TeacherController;