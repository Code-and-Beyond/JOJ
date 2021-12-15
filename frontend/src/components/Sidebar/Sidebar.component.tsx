import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setLogout } from '../../helpers/session';
import logoutIcon from '../../assets/icons/logout.png';

import IconContainer from '../Icon/Container/Container';
import { useDispatch } from 'react-redux';
import { setUserData, toggleLoggedIn } from '../../store/actions';

type SidebarProps = {
	list: Array<any>;
	initRoute?: string;
};

const Sidebar: React.FC<SidebarProps> = (props) => {
	const { list, initRoute } = props;
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getActiveClass = (currPath: string) => {
		const path = location.pathname.split('/');
		const urlPath = '/' + path[1] + '/' + path[2];
		let classes: string = urlPath === currPath ? 'sidebar__container--active' : '';
		return classes;
	};

	const handleLogout = () => {
		dispatch(toggleLoggedIn(false));
		dispatch(setUserData({}));
		setLogout();
		navigate('/');
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
							<IconContainer src={item.icon} alt='selection' size='xs' text={item.title} />
						</Link>
					</li>
				)}
				<IconContainer src={logoutIcon} alt='selection' size='xs' text='Logout' onClickHandler={handleLogout} />
			</ul>
		</div>
	);
};
export default Sidebar;;;