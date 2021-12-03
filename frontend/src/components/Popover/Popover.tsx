import React from 'react';
import { Popover } from 'react-tiny-popover';


type PopoverProps = {
	open: boolean,
	children: JSX.Element;
	content: JSX.Element;
};

const Pop: React.FC<PopoverProps> = (props) => {

	return (
		<Popover
			isOpen={props.open}
			positions={['bottom', 'left', 'top', 'right']} // preferred positions by priority
			content={<div className='popover'>{props.content}</div>}
		>
			{props.children}
		</Popover>
	);
};
export default Pop;