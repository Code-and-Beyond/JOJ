import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import FillButton from '../../components/Button/Fill';
import Course from '../../components/Course/Course';
import FormContainer from '../../components/Form/FormContainer';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input.component';

import docsIcon from '../../assets/icons/docs.png';
import { getCourseByInviteCodeService, getUserCoursesService } from '../../services/courses';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/root';
import { setCurrentCourse } from '../../store/actions';
import { addCourseMemberService } from '../../services/courseMembers';


type CoursesProps = {

};

const getColor = (index: number): any => {
	const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'teal', 'indigo', 'lime', 'brown', 'grey'];
	return colors[index % colors.length];
};


const Courses: React.FC<CoursesProps> = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);
	const courseState = useSelector((state: RootState) => state.crs);
	const [inviteCode, setInviteCode] = useState('');

	const [formOpen, setFormOpen] = useState(false);

	// get all courses of user
	const fetchAllCourses = async () => {
		await getUserCoursesService(dispatch);
	};

	useEffect(() => {
		if (courseState.courses.length === 0) {
			fetchAllCourses();
		}
	}, []);

	const handleCourseClick = (course: any, color: string) => {
		dispatch(setCurrentCourse({ ...course, color }));
		navigate(course['courseId'] + '/evaluations');
	};

	const handleJoinCourse = async () => {
		setFormOpen(false);
		const res = await getCourseByInviteCodeService(inviteCode, dispatch);
		await addCourseMemberService(res.course[0].courseId, dispatch);
		fetchAllCourses();
	};


	const getForm = () => {
		return formOpen && <div className='teacher__form'>
			<FormContainer title='Join Course' onAdd={handleJoinCourse} onCancel={() => setFormOpen(false)}>
				<Input type='text' placeholder='Invite' value={inviteCode} handleInput={(val: string) => setInviteCode(val)} />
			</FormContainer>
		</div>;
	};

	const getCourses = () => (
		<div className='teacher__courses'>
			<div className='teacher__courses--head'>
				<div>
					<div>
						<h1 className='h h--2'>Courses</h1>
						<h2 className='b b--1'>Join a new course, participate in evaluations.</h2>
					</div>
					<FillButton text='Join Course' type={3} onClickHandler={() => setFormOpen(true)} extraStyle='u-m-r-b' disable={formOpen} />
				</div>
			</div>
			<div className='teacher__courses--body'>
				<div>
					{courseState.courses.map((course: any, index: number) =>
						<Course bgColor={getColor(index)} key={index} course={course} onClickHandler={() => handleCourseClick(course, getColor(index))} />
					)}
				</div>
			</div>
		</div>
	);

	return (
		<div className='d--f'>
			<div className='teacher__content'>
				<Header title='Courses' icon={docsIcon} />
				{getCourses()}
			</div>
			{getForm()}
		</div>
	);
};
export default Courses;