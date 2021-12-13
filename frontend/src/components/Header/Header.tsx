import React from 'react';
import { Avatar } from '@material-ui/core';
import Icon from '../Icon/Icon';


type HeaderProps = {
	icon: any;
	title: string;
	name: string;
};

const Header: React.FC<HeaderProps> = (props) => {
	const { icon, title, name } = props;

	return (
		<div className='header'>
			<div className='header__title'>
				<Icon src={icon} alt='docs icon' size='s' />
				<h2 className='h h--3'>Welcome to {title}!</h2>
			</div>
			<div className='header__avatar'>
				<Avatar style={{ background: '#4285F4' }}>
					<h2 className='h h--2 h--white'>{name}</h2>
				</Avatar>
			</div>
		</div>
	);
};
export default Header;