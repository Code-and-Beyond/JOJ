import React from 'react';

type CourseProps = {
	bgColor: string;
	onClickHandler?: React.MouseEventHandler<HTMLDivElement> | undefined
};

const Course: React.FC<CourseProps> = (props) => {
	const { bgColor } = props;

	return (
		<div className='course' onClick={props.onClickHandler}>
			<div className='course__head' style={{ backgroundColor: bgColor }}>
				<div className='course__head--title'>
					<h1 className='h h--3'>Introduction to blockchain</h1>
					{/* <h3 className='b b--1 u-m-l-m'>101 Students</h3> */}
				</div>
				<h3 className='b b--3 u-m-b-s'>B.Tech | CSE | 2022</h3>
				<h3 className='b b--3'>2018B2018</h3>
			</div>
			<div className='course__body' >
				<h3 className='b b--2'>Updates</h3>
				<p className='b b--3'>Upcoming contest on 20 Dec.</p>
			</div>
		</div>
	);
};
export default Course;