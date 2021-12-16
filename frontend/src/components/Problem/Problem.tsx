import React from 'react';

type ProblemProps = {
    data?: any;
    count: number;
};

const Problem: React.FC<ProblemProps> = (props) => {
    const { data, count } = props;

    const showSampleTestcases = () => {
        return data.testcases.map((testcase: any, index: number) => (
            testcase.isSample ? <div className='u-m-b-m' key={index}>
                <h3 className='b b--1'>Sample Testcase {index} :</h3>
                <div className='problem__sample a a--2'>
                    <p><span>Input: </span> {testcase.stdin}</p>
                    <p><span>Output: </span> {testcase.expectedOutput}</p>
                </div>
            </div> : null
        ))
    };

    return (
        <div className='problem'>
            <h1 className='h h--3'>{String.fromCharCode(97 + count).toUpperCase()}. {data.name}</h1>
            <div className='u-m-v-m'>
                <h3 className='b b--1'>Problem Statement :</h3>
                <p className='b b--2'>{data.statement}</p>
            </div>
            <div className='u-m-b-m'>
                <h3 className='b b--1'>Constraints :</h3>
                <ul className='a a--2'>
                    {data.constraints.split(';').map((item: any, index: number) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className='u-m-b-m'>
                <h3 className='b b--1'>Input Format :</h3>
                <div className='problem__sample a a--2'>
                    <p className='a a--2'>{data.input}</p>
                </div>
            </div>
            <div className='u-m-b-m'>
                <h3 className='b b--1'>Ouput Format :</h3>
                <div className='problem__sample a a--2'>
                    <p className='a a--2'>{data.output}</p>
                </div>
            </div>
            {showSampleTestcases()}
            <div className='u-m-b-m'>
                <h3 className='b b--1'>Explanation :</h3>
                <div className='problem__sample a a--2'>
                    <p>{data.explanation}</p>
                </div>
            </div>
            <div className='u-m-b-m'>
                {/* <h3 className='b b--1'>Noti :</h3> */}
                <div className='problem__sample a a--2'>
                    <p className='a a--2'><span>Time: </span>{data.timeLimit}</p>
                    <p className='a a--2'><span>Memory: </span>{data.memoryLimit}</p>
                </div>
            </div>
        </div>
    );
};
export default Problem;;;;