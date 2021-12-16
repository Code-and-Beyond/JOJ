import React from 'react';

type TextBoxProps = {
	value: string,
	rows: number,
	cols: number,
	required?: boolean,
	wrap?: any,
	placeholder?: string,
	maxLength?: number,
	name?: string,
	readOnly?: boolean,
	extraStyle?: string;
	handleChange: any;
	handleKeyPress?: any;
};


const TextBox: React.FC<TextBoxProps> = (props) => {
	const {
		value,
		rows,
		cols,
		required,
		wrap,
		placeholder,
		maxLength,
		name,
		readOnly,
	} = props;

	const getClasses = () => {
		let classes = ['textbox'];

		if (props.extraStyle) classes.push(props.extraStyle);

		return classes.join(' ');
	};

	return (
		<textarea
			className={getClasses()}
			value={value}
			onChange={(e) => props.handleChange(e.target.value)}
			onKeyDown={props.handleKeyPress}
			rows={rows}
			cols={cols}
			wrap={wrap}
			required={required}
			maxLength={maxLength}
			placeholder={placeholder}
			name={name}
			readOnly={readOnly}
		/>
	);
};

export default TextBox;
