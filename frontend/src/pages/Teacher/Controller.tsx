import React, { useState } from 'react';
import Courses from './Courses';
import Sidebar from '../../components/Sidebar/Sidebar.component';
import { Outlet } from 'react-router';

type TeacherDashboardProps = {

};

const TeacherDashboard: React.FC<TeacherDashboardProps> = () => {
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

export default TeacherDashboard;