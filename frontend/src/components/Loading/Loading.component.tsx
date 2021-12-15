import React from 'react';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/reducers/root';

type LoadingProps = {

};

const Loading: React.FC<LoadingProps> = () => {
	const loadingState = useSelector((state: RootState) => state.load);
	return (
		loadingState.loading ?
			<Box sx={{ width: '100%' }} style={{ position: 'absolute', top: 0 }}>
				<LinearProgress />
			</Box>
			: null
	);
};
export default Loading;