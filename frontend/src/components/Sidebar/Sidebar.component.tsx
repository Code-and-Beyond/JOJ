import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type SidebarProps = {
	list: Array<any>;
	initRoute?: string;
};

const Sidebar: React.FC<SidebarProps> = (props) => {
	const { list, initRoute } = props;
	const location = useLocation();

	const getActiveClass = (currPath: string) => {
		const path = location.pathname.split('/');
		const urlPath = '/' + path[1] + '/' + path[2];
		let classes: string = urlPath  === currPath ? 'sidebar__container--active' : '';
		return classes;
	};

	return (
		<div className='sidebar'>
			<div className='sidebar__head'>
				<h1 className='h h--3'>JOJ</h1>
			</div>
			<ul className='sidebar__container'>
				{list.map((item, index) =>
					<li key={index} className={getActiveClass(initRoute + item.path)}>
						<Link to={initRoute + item.path} className='sidebar__container--link' >
							<h2 className='a a--2'>{item.title}</h2>
						</Link>
					</li>
				)}
				<h2 className='a a--2'>Settings</h2>
			</ul>
		</div>
	);
};
export default Sidebar;;;