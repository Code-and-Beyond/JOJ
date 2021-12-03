import React from 'react';

interface inputProps {
	placeholder?: string;
	type: string;
	value: any;
	extraStyle?: string;
	handleInput: any;
	disable?: boolean;
}

const Input: React.FC<inputProps> = (props) => {
	const { value, placeholder, type, disable } = props;
	const getClasses = () => {
		let classes = ["input"];

		if (props.extraStyle) classes.push(props.extraStyle);

		return classes.join(" , ");
	};

	return (
		<input
			type={type}
			placeholder={placeholder}
			className={getClasses()}
			value={value}
			disabled={disable}
			onChange={(e) => props.handleInput(e.target.value)}
		/>
	);
};

export default Input;
