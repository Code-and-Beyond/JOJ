import React from 'react';

import Icon from '../Icon/Icon';

import hvBusLogo from '../../assets/logos/hvbus-logo.png';
import { Link } from 'react-router-dom';

type FooterProps = {

};

const Footer: React.FC<FooterProps> = () => {

	return (
		<footer className='footer'>
			{/* <h2 className='h h--2 u-p-b-m'>Hyperverge Bus</h2> */}
			<div className='footer__links b b--1'>
				<Link to='/'>Home</Link>
				<Link to='/buses/search'>Buses</Link>
				<Link to='/buses/ticket/mytickets'>Tickets</Link>
				<Link to='/about'>About</Link>
				<Link to='/faqs'>FAQs</Link>
			</div>
			<Icon src={hvBusLogo} alt='HV logo' size='l' />
			<h3 className='b b--2'>{'Copyright © '} HVbus {new Date().getFullYear()}.</h3>
			<h2 className='b b--3 text--disabled'>All rights reserved.</h2>
		</footer>
	);
};
export default Footer;