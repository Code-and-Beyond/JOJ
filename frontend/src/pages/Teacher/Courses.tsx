import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import FillButton from '../../components/Button/Fill';
import Course from '../../components/Course/Course';
import FormContainer from '../../components/Form/FormContainer';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input.component';
import colors from '../../sass/abstracts/_vars.scss';

import docsIcon from '../../assets/icons/docs.png';
import { addCourseService, getUserCoursesService } from '../../services/courses';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/root';


type CoursesProps = {

};

const getColor = (index: number) => {
	const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'teal', 'indigo', 'lime', 'brown', 'grey'];
	return colors[index % colors.length];
};


const Courses: React.FC<CoursesProps> = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);
	const loadingState = useSelector((state: RootState) => state.load);
	console.log(colors);
	const [course, setCourse] = useState({
		name: '',
		code: '',
		degree: '',
		year: 2022,
		batch: '',
		branch: ''
	});
	const [formOpen, setFormOpen] = useState(false);
	const [courses, setCourses] = useState([]);

	// get all courses of user
	const fetchAllCourses = async () => {
		const allCourses = await getUserCoursesService(dispatch);
		setCourses(allCourses.courses);
		console.log(allCourses);
	};

	useEffect(() => {
		fetchAllCourses();
	}, []);

	const handleCourseData = (type: string, val: string | number) => {
		setCourse({ ...course, [type]: val });
	};


	const getForm = () => {
		return formOpen && <div className='teacher__form'>
			<FormContainer title='Add Course' onAdd={() => { addCourseService(userState.info.uid, course, dispatch); setFormOpen(false); }} onCancel={() => setFormOpen(false)}>
				<Input type='text' placeholder='Course Name' value={course.name} handleInput={(val: string) => handleCourseData('name', val)} />
				<Input type='text' placeholder='Subject Code' value={course.code} handleInput={(val: string) => handleCourseData('code', val)} />
				<Input type='text' placeholder='Branch' value={course.branch} handleInput={(val: string) => handleCourseData('branch', val)} />
				<Input type='text' placeholder='Degree' value={course.degree} handleInput={(val: string) => handleCourseData('degree', val)} />
				<Input type='number' placeholder='Year' value={course.year} handleInput={(val: number) => handleCourseData('year', val)} />
				<Input type='text' placeholder='Batch(es)' value={course.batch} handleInput={(val: string) => handleCourseData('batch', val)} />
			</FormContainer>
		</div>;
	};

	const getCourses = () => (
		<div className='teacher__courses'>
			<div className='teacher__courses--head'>
				<div>
					<div>
						<h1 className='h h--2'>Courses</h1>
						<h2 className='b b--1'>Create a new course, conduct and schedule contests.</h2>
					</div>
					<FillButton text='Add Course' type={3} onClickHandler={() => setFormOpen(true)} extraStyle='u-m-r-b' disable={formOpen} />
				</div>
			</div>
			<div className='teacher__courses--body'>
				<div>
					{courses.map((course, index) =>
						<Course bgColor={getColor(index)} key={index} course={course} onClickHandler={() => navigate(course['courseId'] + '/evaluations')} />)
					}
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