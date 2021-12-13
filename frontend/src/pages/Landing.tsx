import React, { useEffect } from 'react';
import FillButton from '../components/Button/Fill';
import NoFillButton from '../components/Button/NoFill';
import codeLogo from '../code-run.json';
import lottie from "lottie-web";
import { useNavigate } from 'react-router';


type LandingProps = {

};

const Landing: React.FC<LandingProps> = () => {
	const navigate = useNavigate();

	useEffect(() => {
		lottie.loadAnimation({
			container: document.querySelector("#react-logo") as HTMLElement,
			animationData: codeLogo
		});
	}, []);

	return (
		<div className='landing'>
			<div className='landing__container'>
				<div className='landing__head'>
					<h1 className='h h--l1'>JOJ</h1>
				</div>
				<div className='landing__content'>
					<div>
						<h3 className='d d--2'> The one place where we connect the upcoming developers and the current ones.</h3>
						{/* <h3 className='h h--2 u-m-b-m'> Connecting the upcoming developers and the current ones.</h3> */}
						<div className='d--f'>
							<div className='landing__content--tile'>
								<h4 className='h h--3'>For Teachers</h4>
								<p className='b b--1'>Create ready assessments, have reports and provide feedback.</p>
								<FillButton type={1} text='Teacher' onClickHandler={() => navigate('login/teacher')} />
							</div>
							<div className='landing__content--tile'>
								<h4 className='h h--3'>For Students</h4>
								<p className='b b--1'>Give live contests, see past participations, get all results and sign in to clubs.</p>
								<NoFillButton type={1} text='Student' onClickHandler={() => navigate('login/student')} />
							</div>
						</div>
					</div>

					<div id="react-logo" className='landing__content--logo' />
					{/* <div className='landing__content--tile'>
						<h4 className='h h--2'>For Teachers</h4>
						<p className='h h--4'>Create ready assessments, <br />have reports and provide feedback.</p>
						<FillButton type={1} text='Teacher' onClickHandler={() => console.log('teacher')} />
					</div> */}
				</div>
			</div>
		</div >
	);
};
export default Landing;