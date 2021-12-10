import React from 'react';
import FillButton from '../Button/Fill';

type FormContainerProps = {
	children: React.ReactNode;
	title: string;
	// text: string;
	onAdd: React.MouseEventHandler<HTMLDivElement>;
	onCancel: React.MouseEventHandler<HTMLDivElement>;
};

const FormContainer: React.FC<FormContainerProps> = (props) => {

	return (
		<div className='form__container'>
			<h1 className='h h--4 text--center'>{props.title}</h1>
			<div>
				{props.children}
				<div className='form__container--btn'>
					<FillButton type={4} onClickHandler={props.onAdd} text='Add' />
					<FillButton type={2} onClickHandler={props.onCancel} text='Cancel' />
				</div>
			</div>
		</div>
	);
};
export default FormContainer;