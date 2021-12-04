import React from 'react';

import Icon from '../Icon';

type ContainerProps = {
	text?: string,
	color: string,
	src: any,
	alt: string,
	size: string;
	onClickHandler: React.MouseEventHandler<HTMLDivElement>;
};


const Container: React.FC<ContainerProps> = (props) => {
	const { text, color, src, alt, size } = props;
	return (
		<div className='icon--container u-c-pointer' style={{ background: color }} onClick={props.onClickHandler}>
			<Icon src={src} alt={alt} size={size} />
			<h1 className='h--white b b--2'>{text}</h1>
		</div>
	);
};

export default Container;
