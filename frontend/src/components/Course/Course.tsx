import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/root';

type CourseProps = {
	course: any;
	bgColor: string;
	onClickHandler?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

const Course: React.FC<CourseProps> = (props) => {
	const { bgColor, course } = props;
	const userState = useSelector((state: RootState) => state.user);

	return (
		<div className='course' onClick={props.onClickHandler}>
			<div className='course__head' style={{ backgroundColor: bgColor }}>
				<div className='course__head--title'>
					<h1 className='h h--3'>{course.name}</h1>
					{/* <h3 className='b b--1 u-m-l-m'>101 Students</h3> */}
				</div>
				<h3 className='b b--3 u-m-b-s'>{course.degree} | {course.branch} | {course.year}</h3>
				<h3 className='b b--3'>{course.subjectCode} | {course.batch}</h3>
				{userState.info.role === 'teacher' ? <h3 className='a a--2 u-m-t-m text--disabled'>Invite Code : {course.inviteCode}</h3> : null}
			</div>
			<div className='course__body' >
				<h3 className='b b--2'>Updates</h3>
				<p className='b b--3'>Upcoming contest on 20 Dec.</p>
			</div>
		</div>
	);
};
export default Course;