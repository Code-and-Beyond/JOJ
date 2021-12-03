import React from 'react';
import Icon from '../Icon/Icon';

interface iconButtonProps {
	type: number;
	text: string;
	icon: string,
	extraStyle?: string;
	onClickHandler: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const IconButton: React.FC<iconButtonProps> = (props) => {

	const getClasses = () => {
		let classes = ["button button--text a a--1 u-c-pointer d--f d--f--r ai--c jc--c"];

		switch (props.type) {
			case 1: classes.push("button--text--primary"); break;
			case 2: classes.push("button--text--error"); break;
			case 3: classes.push("button--text--warning"); break;
			case 4: classes.push("button--text--info"); break;
			case 5: classes.push("button--text--success"); break;
			default: classes.push("button--text--normal");
		}

		if (props.extraStyle) classes.push(props.extraStyle);

		return classes.join(", ");
	};

	return (
		<div className={getClasses()} onClick={props.onClickHandler}>
			<Icon src={props.icon} alt={props.text} size="s" />
			{props.text}
		</div>
	);
};

export default IconButton;