import React from 'react';

type IconProps = {
	extraStyle?: string,
	onClickHandler?: any,
	size: string,
	src: any,
	alt: string;
};

const Icon: React.FC<IconProps> = (props) => {
	const getClasses = () => {
		let classes: string[] = ["icon"];

		if (props.extraStyle) classes.push(props.extraStyle);
		if (props.onClickHandler) classes.push("u-c-pointer");
		if (props.size === "xs") classes.push("icon--xs");
		else if (props.size === "s") classes.push("icon--s");
		else if (props.size === "m") classes.push("icon--m");
		else if (props.size === "b") classes.push("icon--b");
		else if (props.size === "l") classes.push("icon--l");

		return (classes.join(' , '));
	};

	return (
		props.onClickHandler ?
			<img className={getClasses()} src={props.src} alt={props.alt} onClick={props.onClickHandler} />
			:
			<img className={getClasses()} src={props.src} alt={props.alt} />
	);
};

export default Icon;