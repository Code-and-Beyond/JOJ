import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import Countdown from 'react-countdown';

import CodeMirror from '@uiw/react-codemirror';
import 'react-dropdown/style.css';

// import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import FillButton from '../components/Button/Fill';
import NoFillButton from '../components/Button/NoFill';
import Problem from '../components/Problem/Problem';
import { createSubmissionService } from '../services/submission';
import { useDispatch, useSelector } from 'react-redux';
import { runCodeService, submitCodeService } from '../services/judge0';
import { getTestProblemsService } from '../services/problem';
import { useNavigate } from 'react-router';
import {
    addReportEntryService,
    getReportEntryService,
} from '../services/reports';
import { useLocation } from 'react-router';
import Loading from '../components/Loading/Loading.component';
import { RootState } from '../store/reducers/root';
import RunWindow from '../components/RunWindow/RunWindow';

type TestProps = {
    // testId: string;
};

const Completionist = () => <span>You are good to go!</span>;

type rendererProps = {
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
};

const renderer: React.FC<rendererProps> = (props) => {
    const { hours, minutes, seconds, completed } = props;

    if (completed) {
        // Render a complete state
        return <Completionist />;
    } else {
        // Render a countdown
        return (
            <span>
                {hours ? hours + 'h : ' : null}{' '}
                {minutes ? minutes + 'm : ' : minutes}
                {seconds ? seconds + 's' : null}
            </span>
        );
    }
};

type testcaseType = {
    testcaseId: string;
    stdin: string;
    expectedOutput: string;
    isSample: boolean;
};

const Test: React.FC<TestProps> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [code, setCode] = useState('');
    const options = ['C++', 'Python', 'Javascript'];
    const [languages] = useState(options[0]);

    const currEval = useSelector(
        (state: RootState) => state.eval.currentEvalution
    );
    const [currProblem, setCurrProblem]: any = useState({});
    const [currProblemIndex, setCurrProblemIndex]: any = useState(0);

    const [submission, setSubmission]: any = useState({});
    const [problems, setProblems] = useState([]);
    const [openRunCode, setOpenRunCode] = useState(false);
    const [customTestcase, setCustomTestcase] = useState('');
    const [submit, setSubmit] = useState(false);

    const evalId = location.pathname.split('/')[2];

    const createReportEntry = async () => {
        await addReportEntryService(evalId, {}, dispatch);
        console.log('in create report entry');
        navigate(-2);
    };

    const fetchTestProblems = async () => {
        const evalId = location.pathname.split('/')[2];

        const res: any = await getTestProblemsService(evalId, dispatch);
        setProblems(res);
        setCurrProblem(res[0]);
        console.log(res);
    };

    const reportEntryExists = async () => {
        const res = await getReportEntryService(evalId, dispatch);
        console.log('report entry', res.reportEntry);
        return res.reportEntry.length < 1 ? false : true;
    };

    const contestNotStartedYet = () => {
        const currTime: Date = new Date();
        // console.log(currTime, changeTimezoneToIst(currEval.startTime));
        return currTime < changeTimezoneToIst(currEval.startTime);
    };

    const allowedToView = async () => {
        if (contestNotStartedYet() === true)
            return {
                allowed: false,
                message: 'Evaluation not yet started!',
            };

        if (contestEnded() === false) {
            const testSubmitted = await reportEntryExists();
            if (testSubmitted === true) {
                return {
                    allowed: false,
                    message: 'Test already submitted!',
                };
            }
        }

        return {
            allowed: true,
            message: '',
        };
    };

    const checkIfAllowed = async () => {
        const res = await allowedToView();
        console.log('allowed?', res.allowed);
        if (!res.allowed) {
            alert(res.message);
            navigate(-1);
        } else {
            fetchTestProblems();
        }
    };

    useEffect(() => {
        checkIfAllowed();
    }, []);

    const pushSubmissionToDatabase = (submission: any) => {
        createSubmissionService(currProblem['problemId'], submission, dispatch);
    };

    const runCode = async (
        languageName: string,
        sourceCode: string,
        stdin: string
    ) => {
        const submission = await runCodeService(
            languageName,
            sourceCode,
            stdin
        );
        console.log(submission);
        if (submission) {
            setSubmission(submission);
        }
    };

    const submitCode = async (
        testcases: testcaseType[],
        languageName: string,
        sourceCode: string
    ) => {
        setSubmit(true);
        console.log(testcases, languageName, sourceCode);
        const submissionObj = await submitCodeService(
            testcases,
            languageName,
            sourceCode
        );

        console.log(submissionObj);

        // Known issue: Judge0 call fails for Compile Error.
        // Status: 400, Message: "some attributes for one or more submissions cannot be converted to UTF-8, use base64_encoded=true query parameter"
        
        // If for some reason `submissionObj` is not received, submission is not set and the result is not pushed to the database.
        if (submissionObj) {
            setSubmission(submissionObj?.submission);
            pushSubmissionToDatabase(submissionObj?.submissionResult);
        }
    };

    const getEditor = () => (
        <div className="test__body--editor">
            <div>
                <Dropdown
                    options={options}
                    value={languages}
                    onChange={(e) => console.log(e)}
                    placeholder="Select an option"
                />
            </div>
            <div>
                <CodeMirror
                    value={code}
                    height="82.5vh"
                    theme="dark"
                    className="a a--2"
                    extensions={[cpp()]}
                    indentWithTab
                    onChange={(value, viewUpdate) => {
                        setCode(value);
                    }}
                />
            </div>
            <div style={{ position: 'relative', padding: 'auto 0' }}>
                {openRunCode && (
                    <RunWindow
                        testcase={customTestcase}
                        result={submission}
                        handleTestCaseChange={(val: string) => {
                            setCustomTestcase(val);
                        }}
                        handleClose={() => setOpenRunCode(false)}
                    />
                )}
                <div>
                    {submission && Object.keys(submission).length ? (
                        <h2 className="h h--4 u-m-l-s">
                            Verdict:{' '}
                            {submit ? submission.status.description : ' '}
                        </h2>
                    ) : null}
                </div>

                <NoFillButton
                    type={1}
                    text="Run Code"
                    onClickHandler={() => {
                        if (code.length && customTestcase.length)
                            runCode(languages, code, customTestcase); // change these values
                        setOpenRunCode(true);
                    }}
                    extraStyle="u-m-l-auto a a--2 test__body--btn"
                />
                <FillButton
                    type={3}
                    text="Submit"
                    onClickHandler={() => {
                        if (code.length)
                            submitCode(
                                currProblem['testcases'],
                                languages,
                                code
                            );
                    }}
                    extraStyle="u-m-l-s a a--2 test__body--btn"
                />
            </div>
        </div>
    );

    function convertTimezone(date: Date | string, tzString: string) {
        return new Date(
            (typeof date === 'string' ? new Date(date) : date).toLocaleString(
                'en-US',
                { timeZone: tzString }
            )
        );
    }

    const changeTimezoneToIst = (dateString: string) => {
        const offsetMs = (5 * 60 + 30) * 60000;
        const date = new Date(dateString);
        const dateWithOffset = new Date(date.getTime() - offsetMs);
        return convertTimezone(dateWithOffset, 'Asia/Kolkata');
    };

    const contestEnded = () => {
        const currTime: Date = new Date();
        // console.log(currTime, changeTimezoneToIst(currEval.endTime));
        return currTime >= changeTimezoneToIst(currEval.endTime);
    };

    return (
        <div className="test" style={{ position: 'relative' }}>
            <Loading />
            <div className="test__head">
                <h1 className="h h--3 test__head--logo">JOJ</h1>
                <h3 className="h h--4 test__head--title">{currEval.name}</h3>
                <h2 className="b b--2 test__head--time">
                    {contestEnded() === false ? (
                        <Countdown
                            date={changeTimezoneToIst(currEval.endTime)}
                            zeroPadTime={4}
                            zeroPadDays={2}
                            renderer={renderer}
                            onComplete={createReportEntry}
                        />
                    ) : null}
                </h2>
                {contestEnded() === false ? (
                    <FillButton
                        type={2}
                        text="End test"
                        onClickHandler={() => {
                            createReportEntry();
                        }}
                        extraStyle="a a--2 test__head--endtest"
                    />
                ) : null}
            </div>
            {problems.length ? (
                <div className="test__body">
                    <div className="test__body--nav">
                        {problems.map((problem: any, index: number) => (
                            <h3
                                className={
                                    currProblem.problemId === problem.problemId
                                        ? 'h h--3 test__body--nav-active'
                                        : 'h h--3'
                                }
                                onClick={() => {
                                    setCurrProblem(problem);
                                    setCurrProblemIndex(index);
                                }}
                                key={index}
                            >
                                {String.fromCharCode(97 + index).toUpperCase()}
                            </h3>
                        ))}
                    </div>
                    <div className="test__body--problem">
                        {Object.keys(currProblem).length ? (
                            <Problem
                                data={currProblem}
                                count={currProblemIndex}
                            />
                        ) : null}
                    </div>
                    {getEditor()}
                </div>
            ) : null}
        </div>
    );
};
export default Test;
