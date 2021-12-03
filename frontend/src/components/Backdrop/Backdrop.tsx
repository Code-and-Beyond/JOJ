import React from 'react';
import { Backdrop, makeStyles } from '@material-ui/core';

interface backdropProps {
	open: boolean,
	handleClose?: () => void;
};
const useStyles = makeStyles((theme) => ({
	root: {
		zIndex: 100,
	},
}));


const Back: React.FC<backdropProps> = (props) => {
	const classes = useStyles();
	const { open } = props;

	return (
		<Backdrop className={classes.root} open={open} onClick={props.handleClose}>
			{props.children}
		</Backdrop>
	);
};

export default Back;
