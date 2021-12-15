import React from 'react';
import GoogleLogin from 'react-google-login';

import google from '../../assets/icons/logo-google.svg';
import IconContainer from '../Icon/Container/Container';
import { useLocation, useNavigate } from 'react-router';
import { googleLogin } from '../../services/auth';
import { useDispatch } from 'react-redux';


type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const role = location.pathname.split('/')[location.pathname.split('/').length - 1];

	const onJoinTest = () => {

	};



	return <div className='login'>
		<div className='login__message'>
			<h2 className='h h--1'>Welcome to the Jaypee Online Judge!</h2>
			<h3 className='h h--3'>{role} Login</h3>
		</div>
		<div className='login__container card'>
			<div className='login__container--head'>
				<h1 className="h h--3">JOJ: The Jaypee Online Judge</h1>
				<p className='b b--2 h--disabled'>Lets code on our own online judge!</p>
			</div>
		</div>
	</div>;
};
export default Login;