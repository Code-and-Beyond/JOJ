import React, { useState } from 'react';
import Courses from './Courses';
import Sidebar from '../../components/Sidebar/Sidebar.component';

type TeacherDashboardProps = {

};

const TeacherDashboard: React.FC<TeacherDashboardProps> = () => {
	const [item,] = useState<string>('courses');
	const getSelectedItem = (item: string) => {
		switch (item) {
			case 'courses':
				return <Courses />;
			default:
				return <Courses />;
		}
	};

	return (
		<div className='teacher'>
			<Sidebar />
			{getSelectedItem(item)}

		</div>
	);
};

export default TeacherDashboard;