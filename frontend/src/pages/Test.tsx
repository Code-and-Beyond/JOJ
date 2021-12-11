import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import Countdown from "react-countdown";


import CodeMirror from '@uiw/react-codemirror';
import 'react-dropdown/style.css';

// import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import FillButton from '../components/Button/Fill';
import NoFillButton from '../components/Button/NoFill';
import Problem from '../components/Problem/Problem';

type TestProps = {

};

const Completionist = () => <span>You are good to go!</span>;

type rendererProps = {
	hours: number,
	minutes: number,
	seconds: number,
	completed: boolean
}

const renderer: React.FC<rendererProps> = (props) => {
	const { hours, minutes, seconds, completed } = props;
	
	if (completed) {
	  // Render a complete state
		return <Completionist />;
		
	} else {
	  // Render a countdown
	  return (
		<span>{hours ? hours + 'h : ' : null} {minutes ? minutes + 'm : ' : minutes}{seconds ? seconds + 's' : null}</span>
	  );
	}
};

const Test: React.FC<TestProps> = () => {
	const [code, setCode] = useState('');
	const options = ['C++', 'Python', 'Javascript'];
	const [languages, ] = useState(options[0]);

	const getEditor = () => (
		<div className='test__body--editor'>
			<div>
				<Dropdown
					options={options}
					value={languages}
					onChange={(e) => (console.log(e))}
					placeholder="Select an option" />
			</div>
			<div>
				<CodeMirror
					value={code}
					height="82.5vh"
					theme='dark'
					className='a a--2'
					extensions={[cpp()]}
					indentWithTab
					onChange={(value, viewUpdate) => {
						setCode(value);
					}}
				/>
			</div>
			<div>
				<NoFillButton type={1} text='Run Code' onClickHandler={() => console.log('run code')} extraStyle='u-m-l-auto a a--2' />
				<FillButton type={3} text='Submit' onClickHandler={() => console.log('run code')} extraStyle='u-m-l-s a a--2' />
			</div>
		</div>
	);

	return (
		<div className='test'>
			<div className='test__head'>
				<h1 className='h h--3 test__head--logo'>JOJ</h1>
				<h3 className='h h--4 test__head--title'>Data Structures and Algorithms Test</h3>
				<h2 className='b b--2 test__head--time'>
					<Countdown
						date="2021-12-13T14:12:03"
						zeroPadTime={4}
						zeroPadDays={2}
						renderer={renderer}
					/>
				</h2>
				<FillButton type={2} text='End test' onClickHandler={() => console.log('run code')} extraStyle='a a--2 test__head--endtest' />
			</div>
			<div className='test__body'>
				<div className='test__body--nav'>
					<h3 className='h h--3 test__body--nav-active'>A</h3>
					<h3 className='h h--3'>B</h3>
					<h3 className='h h--3'>C</h3>
				</div>
				<div className='test__body--problem'><Problem /></div>
				{getEditor()}
			</div>
		</div>
	);
};
export default Test;;