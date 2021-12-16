import React from 'react';
import Icon from '../Icon/Icon';
import TextBox from '../TextBox/TextBox';

import downArrowIcon from '../../assets/icons/down-arrow.png';

type RunWindowProps = {
	testcase: string;
	result: any;
	handleTestCaseChange: any;
	handleClose: any;
};

const RunWindow: React.FC<RunWindowProps> = (props) => {
	const { testcase, result } = props;

	return (
		<div className='runwindow'>
			<div className='runwindow__container'>
				<h2 className='b b--2'>Custom Testcase</h2>
				<div className='runwindow__container--content'>
					<TextBox
						cols={10}
						rows={6}
						value={testcase}
						placeholder="Enter your testcase here"
						handleChange={props.handleTestCaseChange}
					/>
				</div>
			</div>

			<div className='runwindow__container'>
				<div className='d--f ai--c'>
					<h2 className='b b--2'>Run Code Result</h2>
					<Icon src={downArrowIcon} alt='down arrow' size='s' onClickHandler={props.handleClose} />
				</div>
				<div className='runwindow__container--content'>
					<TextBox
						cols={10}
						rows={6}
						value={result.stdout}
						placeholder="Output will be here"
						readOnly={true}
					/>
				</div>
			</div>

		</div>
	);
};
export default RunWindow;