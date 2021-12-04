import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/root';
import { getUser, isLoggedIn, setLogout } from '../../helpers/session';
import { setUserData, toggleLoggedIn } from '../../store/actions';

import Icon from '../Icon/Icon';
import Popover from '../Popover/Popover';

import hvlogo from '../../assets/logos/hvbus-logo.png';
import checkAccess from '../../helpers/token';
import { Avatar } from '@material-ui/core';

type headerProps = {
	name?: string;
};

const redColor = '#E74E35';
const greenColor = '#0F9D58';

const Header: React.FC<headerProps> = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);
	const [popoverOpen, setPopoverOpen] = useState(false);

	// To persist login state
	useEffect(() => {
		if (isLoggedIn() && !checkAccess().isExp) {
			const user = getUser();
			dispatch(toggleLoggedIn(true));
			dispatch(setUserData(user));
		}
	}, []);

	const handleDashboard = () => {
		setPopoverOpen(!popoverOpen);
		navigate('/admin/dashboard');
	};

	const handleMyProfile = () => {
		setPopoverOpen(!popoverOpen);
		navigate(`/buses/tickets/${userState.info._id}/user`);
	};

	const handleLogout = () => {
		dispatch(toggleLoggedIn(false));
		dispatch(setUserData({}));
		setLogout();
		setPopoverOpen(!popoverOpen);
		navigate('/');
	};

	const options = (
		<div className='b b--3 header--options'>
			{userState.info.role === 'admin' && <p onClick={handleDashboard}>Dashboard</p>}
			<p onClick={handleMyProfile}>My Profile</p>
			<p onClick={handleLogout}>Logout</p>
		</div>
	);

	const getLogData = () => (
		userState.loggedIn ? (
			<Popover open={popoverOpen} content={options}>
				<div className='u-c-pointer d--f ai--c' onClick={() => setPopoverOpen(!popoverOpen)}>
					<Avatar style={{ background: userState.info.role === 'admin' ? greenColor : redColor, fontSize: '2.2rem' }} >
						{userState.info.name.substring(0, 1)}
					</Avatar>
				</div>
			</Popover>
		) : (
			<Link to='/login' className='header--link'>
				<p className='u-c-pointer u-thover'>Login / Register</p>
			</Link>
		)
	);

	return (
		<header className="h h--4 header jc--c">
			<div className="header__container">
				<Link to='/' className='d--f ai--c'>
					<Icon src={hvlogo} alt='HVbus logo' size='l' extraStyle='u-p-v-s' />
				</Link>

				<div className='header__title b b--3'>
					<p className='u-c-pointer u-thover'>My Bookings</p>
					{getLogData()}
				</div>
			</div>
		</header >
	);
};
export default Header;;