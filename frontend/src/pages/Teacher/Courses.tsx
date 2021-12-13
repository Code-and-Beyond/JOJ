import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import FillButton from '../../components/Button/Fill';
import Course from '../../components/Course/Course';
import FormContainer from '../../components/Form/FormContainer';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input.component';
// import colors from '../../sass/abstracts/vars.scss';

import docsIcon from '../../assets/icons/docs.png';

type CoursesProps = {

};

const Courses: React.FC<CoursesProps> = () => {
	const navigate = useNavigate();
	const [course,] = useState({
		name: '',
		code: '',
		degree: '',
		year: 2022,
		batch: '',
		branch: ''
	});
	const [formOpen, setFormOpen] = useState(false);

	const getForm = () => {
		return formOpen && <div className='teacher__form'>
			<FormContainer title='Add Course' onAdd={() => console.log('add')} onCancel={() => setFormOpen(false)}>
				<Input type='text' placeholder='Course Name' value={course.name} handleInput={() => console.log('hello')} />
				<Input type='text' placeholder='Subject Code' value={course.code} handleInput={() => console.log('code')} />
				<Input type='text' placeholder='Branch' value={course.branch} handleInput={() => console.log('code')} />
				<Input type='text' placeholder='Degree' value={course.degree} handleInput={() => console.log('code')} />
				<Input type='number' placeholder='Year' value={course.year} handleInput={() => console.log('code')} />
				<Input type='text' placeholder='Batch(es)' value={course.batch} handleInput={() => console.log('code')} />
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
					<Course bgColor={'red'} onClickHandler={() => navigate('12/evaluations')} />
					<Course bgColor={'blue'} />
					<Course bgColor={'orange'} />
					<Course bgColor={'green'} />
					<Course bgColor={'aqua'} />
					<Course bgColor={'grey'} />
					<Course bgColor={'grey'} />
					<Course bgColor={'grey'} />
				</div>
			</div>
		</div>
	);

	return (
		<div className='d--f'>
			<div className='teacher__content'>
				<Header title='Courses' icon={docsIcon} name='R' />
				{getCourses()}
			</div>
			{getForm()}
		</div>
	);
};
export default Courses;