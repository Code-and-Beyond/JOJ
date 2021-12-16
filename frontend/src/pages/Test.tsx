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
import {
    createSubmissionService,
} from '../services/submission';
import { useDispatch, useSelector } from 'react-redux';
import {
    runCodeService,
    submitCodeService,
} from '../services/judge0';
import { getTestProblemsService } from '../services/problem';
import { useNavigate } from 'react-router';
import { addReportEntryService, getReportEntryService } from '../services/reports';
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

    const currEval = useSelector((state: RootState) => state.eval.currentEvalution);
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
        navigate(-2);
    };

    const fetchTestProblems = async () => {
        const evalId = location.pathname.split('/')[2];

        const res: any = await getTestProblemsService(evalId, dispatch);
        setProblems(res);
        setCurrProblem(res[0]);
        console.log(res);
    };

    const allowedToView = async () => {
        const reportEntry = await getReportEntryService('evalId', dispatch);
        return reportEntry.length === 0;
    };

    const checkIfAllowed = async () => {
        const allowed = await allowedToView();
        if (!allowed) {
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

    const runCode = async (languageName: string, sourceCode: string, stdin: string) => {
        const submission = await runCodeService(languageName, sourceCode, stdin);
        console.log(submission);
        setSubmission(submission);
    };

    const submitCode = async (testcases: testcaseType[], languageName: string, sourceCode: string) => {
        setSubmit(true);
        const submissionObj = await submitCodeService(testcases, languageName, sourceCode);
        setSubmit(false);
        setSubmission(submissionObj?.submission);
        pushSubmissionToDatabase(submissionObj?.submissionResult);
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
                {openRunCode && <RunWindow
                    testcase={customTestcase}
                    result={submission}
                    handleTestCaseChange={(val: string) => { setCustomTestcase(val); }}
                    handleClose={() => setOpenRunCode(false)}
                />}
                <div>{Object.keys(submission).length ? <h2 className='h h--4 u-m-l-s'>Verdict: {submit ? submission.status : submission.status.description}</h2> : null}</div>

                <NoFillButton
                    type={1}
                    text="Run Code"
                    onClickHandler={() => {
                        if (code.length && customTestcase.length) runCode(languages, code, customTestcase); // change these values
                        setOpenRunCode(true);
                    }}

                    extraStyle="u-m-l-auto a a--2 test__body--btn"
                />
                <FillButton
                    type={3}
                    text="Submit"
                    onClickHandler={() => {
                        if (code.length)
                            submitCode(currProblem['testcases'], languages, code);
                    }}
                    extraStyle="u-m-l-s a a--2 test__body--btn"
                />
            </div>
        </div>
    );

    return (
        <div className="test" style={{ position: 'relative' }}>
            <Loading />
            <div className="test__head">
                <h1 className="h h--3 test__head--logo">JOJ</h1>
                <h3 className="h h--4 test__head--title">
                    {currEval.name}
                </h3>
                <h2 className="b b--2 test__head--time">
                    <Countdown
                        date="2021-12-16T14:12:03"
                        zeroPadTime={4}
                        zeroPadDays={2}
                        renderer={renderer}
                    />
                </h2>
                <FillButton
                    type={2}
                    text="End test"
                    onClickHandler={() => {
                        createReportEntry();
                    }}
                    extraStyle="a a--2 test__head--endtest"
                />
            </div>
            <div className="test__body">
                <div className="test__body--nav">
                    {problems.map((problem: any, index: number) => (
                        <h3 className={currProblem.problemId === problem.problemId ? 'h h--3 test__body--nav-active' : 'h h--3'} onClick={() => { setCurrProblem(problem); setCurrProblemIndex(index); }}>
                            {String.fromCharCode(97 + index).toUpperCase()}
                        </h3>
                    ))}
                </div>
                <div className="test__body--problem">
                    {Object.keys(currProblem).length ? <Problem data={currProblem} count={currProblemIndex} /> : null}
                </div>
                {getEditor()}
            </div>
        </div>
    );
};
export default Test;
