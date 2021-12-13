import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

import google from '../../assets/icons/logo-google.svg';
import IconContainer from '../Icon/Container/Container';
import { useLocation } from 'react-router';


type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
	const location = useLocation();
	const role = location.pathname.split('/')[location.pathname.split('/').length - 1];

	const onSuccessHandler = async (response: any) => {
		const res = await axios({
			url: 'http://localhost:8080/auth/google',
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			data: {
				'token': response.accessToken,
				'username': response.profileObj.email
			}
		});
		console.log(res);
	};

	const onFailureHandler = (res: any) => { console.log({ failure: res }); /*dispatch(setAlert(-1, "Something went wrong", true))*/ };


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

			<GoogleLogin
				clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
				cookiePolicy={'single_host_origin'}
				render={(renderprops: any) =>
					<IconContainer src={google} color='#4285F4' text='SignIn with Google' alt='google logo' size='s' onClickHandler={renderprops.onClick} />
				}
				onSuccess={onSuccessHandler}
				onFailure={onFailureHandler}
			/>
		</div>
	</div>;
};
export default Login;