import React from 'react';
import { Avatar } from '@material-ui/core';
import Icon from '../Icon/Icon';

import docsIcon from '../../assets/icons/docs.png';
import { useLocation, useNavigate } from 'react-router';

type NavbarProps = {
	navList: Array<any>;
};

const Navbar: React.FC<NavbarProps> = (props) => {
	const { navList } = props;
	const location = useLocation();
	const navigate = useNavigate();

	const getActiveClass = (currPath: string) => {
		const path = location.pathname;
		console.log(currPath, path);
		// const urlPath = path.slice(0).join('/');

		let classes: string = path === currPath ? 'b b--2 navbar__nav--active' : 'b b--2';
		return classes;
	};

	return (
		<div className='navbar'>
			<div className='navbar__title'>
				<Icon src={docsIcon} alt='docs icon' size='s' />
				<h2 className='h h--4'>Introduction to blockchain</h2>
			</div>
			<div className='navbar__nav'>
				{navList.map((item, index) =>
					<h3 className={getActiveClass(item.path)} key={index} onClick={() => { navigate(item.path); console.log(item); }}>{item.title}</h3>
					// <h3 className='b b--2'>People</h3>
				)}
			</div>
			<div className='navbar__avatar'>
				<Avatar style={{ background: '#4285F4' }}>
					<h2 className='h h--2 h--white'>R</h2>
				</Avatar>
			</div>
		</div>
	);
};
export default Navbar;