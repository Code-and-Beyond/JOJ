import React from 'react';

type SwitchProps = {
	isOn: boolean,
	onColor: string,
	offColor: string,
	left?: string,
	right?: string;
	extraStyle?: string;
	handleToggle: React.ChangeEventHandler<HTMLInputElement>;
};

const Switch: React.FC<SwitchProps> = (props) => {
	const { isOn, onColor, offColor, left, right, extraStyle } = props;
	return (
		<div className={'d--f ai--c ' + extraStyle}>
			{left && <p className='b b--3 u-m-r-xs a--info text--bold'>{left}</p>}
			<input
				checked={isOn}
				onChange={props.handleToggle}
				className="react-switch-checkbox"
				id={`react-switch-new`}
				type="checkbox"
			/>
			<label
				style={{ background: isOn ? onColor : offColor }}
				className="react-switch-label"
				htmlFor={`react-switch-new`}
			>
				<span className={`react-switch-button`} />
			</label>
			{right && <p className='b b--3 u-m-l-xs a--success text--bold'>{right}</p>}
		</div>
	);
};

export default Switch;