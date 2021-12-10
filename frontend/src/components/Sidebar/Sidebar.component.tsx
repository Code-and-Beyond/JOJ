import React from 'react';

type SidebarProps = {

};

const Sidebar: React.FC<SidebarProps> = () => {

	return (
		<div className='sidebar'>
			<div className='sidebar__head'>
				<h1 className='h h--3'>JOJ</h1>
			</div>
			<div className='sidebar__container'>
				<h2 className='a a--2'>Dashboard</h2>
				<h2 className='a a--2'>Courses</h2>
				<h2 className='a a--2'>Clubs</h2>
				<h2 className='a a--2'>Settings</h2>
			</div>
		</div>
	);
};
export default Sidebar;;;