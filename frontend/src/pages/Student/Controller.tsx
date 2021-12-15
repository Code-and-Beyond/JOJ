import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.component';
import { Outlet } from 'react-router';
import Loading from '../../components/Loading/Loading.component';

import dashboardIcon from '../../assets/icons/dashboard.png';
import coursesIcon from '../../assets/icons/course.png';
import clubsIcon from '../../assets/icons/group.png';

type TeacherControllerProps = {

};

const TeacherController: React.FC<TeacherControllerProps> = () => {
	const sidebarList = [
		{
			path: '/dashboard',
			title: 'Dashboard',
			icon: dashboardIcon,
		},
		{
			path: '/courses',
			title: 'Courses',
			icon: coursesIcon,
		}, {
			path: '/clubs',
			title: 'Clubs',
			icon: clubsIcon,
		}
	];


	return (
		<div style={{ position: 'relative' }}>
			<Loading />
			<div className='teacher'>
				<Sidebar list={sidebarList} initRoute='/student' />
				{/* to render child elements */}
				<div>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default TeacherController;