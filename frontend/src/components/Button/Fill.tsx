import React from 'react';

interface fillButtonProps {
	type: number;
	text: string;
	extraStyle?: string;
	onClickHandler: React.MouseEventHandler<HTMLDivElement> | undefined;
	disable?: boolean;
	color?: any;
}
const FillButton: React.FC<fillButtonProps> = props => {

	const getClasses = () => {
		let classes = ["button button--fill a a--1 u-c-pointer"];

		if (props.extraStyle) classes.push(props.extraStyle);

		switch (props.type) {
			case 2: classes.push("button--fill--error"); break;
			case 3: classes.push("button--fill--warning"); break;
			case 4: classes.push("button--fill--info"); break;
			case 5: classes.push("button--fill--success"); break;
			default: classes.push("button--fill--primary");
		}

		if (props.disable) {
			classes.pop();
			classes.push('button--disable');
		}

		return classes.join(" , ");
	};

	return (
		props.disable ?
			<div className={getClasses()} style={{ background: props.color ? props.color : '' }}>
				{props.text}
			</div>
			:
			<div className={getClasses()} onClick={props.onClickHandler} style={{ background: props.color ? props.color : '' }}>
				{props.text}
			</div>
	);
};

export default FillButton;