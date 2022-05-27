import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/root';
import Icon from '../../components/Icon/Icon';
import copyIcon from '../../assets/icons/copy.png';
import Button from '../Button/Fill';

type CourseProps = {
	course: any;
	bgColor: string;
	onClickHandler?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

const Course: React.FC<CourseProps> = (props) => {
	const { bgColor, course } = props;
	const userState = useSelector((state: RootState) => state.user);

	return (
		<div className='course'>
			<div className='course__head'>
				<div className='course__head--title'>
					<h1 className='h h--3'>{course.name}</h1>
					{/* <h3 className='b b--1 u-m-l-m'>101 Students</h3> */}
				</div>
				<h3 className='b b--3 u-m-b-s'>{course.degree} | {course.branch} | {course.year}</h3>
				<h3 className='b b--3'>{course.subjectCode} | {course.batch}</h3>
				{userState.info.role === 'teacher' ?
					<div className='d--f ai--c u-m-t-m'>
						<h3 className='a a--2 text--disabled u-m-r-s'>Invite Code : {course.inviteCode}</h3>
						<Icon
							src={copyIcon}
							alt="copy icon"
							size="xs"
							extraStyle='u-c-pointer'
							onClickHandler={() => { navigator.clipboard.writeText(course.inviteCode); }}
						/>
					</div>
					: null}
			</div>
			<div className='course__body' >
				<div>
					{/* <h3 className='b b--2'>Updates</h3> */}
					{/* <p className='b b--3'>Upcoming contest on 20 Dec.</p> */}
				</div>
				<Button type={4} text='Details' onClickHandler={props.onClickHandler} />
			</div>
		</div>
	);
};
export default Course;