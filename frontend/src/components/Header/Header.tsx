import React from 'react';
import { Avatar } from '@material-ui/core';
import Icon from '../Icon/Icon';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/root';

type HeaderProps = {
	icon: any;
	title: string;
};

const Header: React.FC<HeaderProps> = (props) => {
	const { icon, title } = props;
	const userState = useSelector((state: RootState) => state.user);

	return (
		<div className='header'>
			<div className='header__title'>
				<Icon src={icon} alt='docs icon' size='s' />
				<h2 className='h h--3'>{title}</h2>
			</div>
			<div className='header__avatar d--f'>
				<Avatar src={userState.info.image}>
					<h2 className='h h--2 h--white'>{userState.info.fname ? userState.info.fname.slice(0, 1) : null}</h2>
				</Avatar>
			</div>
		</div>
	);
};
export default Header;