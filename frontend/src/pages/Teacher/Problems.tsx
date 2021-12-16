import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import moment from 'moment';

import FillButton from '../../components/Button/Fill';
import Evaluation from '../../components/Evaluation/Evaluation';
import FormContainer from '../../components/Form/FormContainer';
import Navbar from '../../components/Navbar/Navbar';
import Problem from '../../components/Problem/Problem';
import Input from '../../components/Input/Input.component';
import { RootState } from '../../store/reducers/root';
import { createTestProblemService, getTestProblemsService } from '../../services/problem';
import { handleOffset } from '../../services/helper';
import { createProblemTestcaseService } from '../../services/testcases';
import TextBox from '../../components/TextBox/TextBox';


type ProblemsProps = {};

const Problems: React.FC<ProblemsProps> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [formOpen, setFormOpen] = useState(false);
    const [testcaseFormOpen, setTestcaseFormOpen] = useState(false);
    const [problems, setProblems] = useState([]);
    const [currProblemId, setCurrProblemId] = useState('');

    const currEvalState = useSelector((state: RootState) => state.eval.currentEvalution);
    const startTime = moment(handleOffset(currEvalState.startTime)).format('LT');
    const endTime = moment(handleOffset(currEvalState.endTime)).format('LT');
    const startDate = moment(handleOffset(currEvalState.startTime)).format('ll').split(',')[0];



    const [data, setData] = useState({
        name: '',
        statement: '',
        input: '',
        output: '',
        constraints: '',
        timeLimit: '',
        memoryLimit: '',
        explanation: ''
    });

    const [testcase, setTestcase] = useState({
        stdin: '',
        expectedOutput: '',
        isSample: false
    });

    // get all problems of current evaluations
    const fetchAllProblems = async (evalId: string) => {
        const allProblems: any = await getTestProblemsService(evalId, dispatch);
        setProblems(allProblems);
        console.log(allProblems);
    };

    useEffect(() => {
        if (Object.keys(currEvalState).length === 0) {
            navigate(-1);
        } else {
            fetchAllProblems(currEvalState.evaluationId);
        }
    }, []);


    const handleAddProblem = async () => {
        setFormOpen(false);
        await createTestProblemService(currEvalState.evaluationId, data, dispatch);
        fetchAllProblems(currEvalState.evaluationId);
    };

    const handleAddTestcase = async () => {
        setTestcaseFormOpen(false);
        await createProblemTestcaseService(currProblemId, testcase, dispatch);
        fetchAllProblems(currEvalState.evaluationId);
    };

    const handleProblemData = (type: string, val: string) => {
        setData({ ...data, [type]: val });
    };
    const handleTestCaseData = (type: string, val: string | boolean) => {
        setTestcase({ ...testcase, [type]: val });
    };

    const getProblemForm = () => {
        return formOpen && <div className='teacher__form'>
            <FormContainer title='Add Problem' onAdd={handleAddProblem} onCancel={() => setFormOpen(false)}>
                <Input type='text' placeholder='Problem Name' value={data.name} handleInput={(val: string) => handleProblemData('name', val)} />
                <TextBox
                    cols={10}
                    rows={5}
                    value={data.statement}
                    placeholder="Problem Statement"
                    handleChange={((val: string) => handleProblemData('statement', val))}
                />
                <TextBox
                    cols={10}
                    rows={1}
                    value={data.input}
                    placeholder="Input Format"
                    handleChange={((val: string) => handleProblemData('input', val))}
                />
                <TextBox
                    cols={10}
                    rows={1}
                    value={data.output}
                    placeholder="Output Format"
                    handleChange={((val: string) => handleProblemData('output', val))}
                />
                <TextBox
                    cols={10}
                    rows={1}
                    value={data.constraints}
                    placeholder="Constraints"
                    handleChange={((val: string) => handleProblemData('constraints', val))}
                />
                <TextBox
                    cols={10}
                    rows={1}
                    value={data.explanation}
                    placeholder="Explanation"
                    handleChange={((val: string) => handleProblemData('explanation', val))}
                />
                <Input type='text' placeholder='Time Limit' value={data.timeLimit} handleInput={(val: string) => handleProblemData('timeLimit', val)} />
                <Input type='text' placeholder='Memory Limit' value={data.memoryLimit} handleInput={(val: string) => handleProblemData('memoryLimit', val)} />
            </FormContainer>
        </div>;
    };

    const getTestCaseForm = () => {
        return testcaseFormOpen && <div className='teacher__form'>
            <FormContainer title='Add Test Case' onAdd={handleAddTestcase} onCancel={() => setTestcaseFormOpen(false)}>
                <TextBox
                    cols={10}
                    rows={5}
                    value={testcase.stdin}
                    placeholder="Input"
                    handleChange={((val: string) => handleTestCaseData('stdin', val))}
                />
                <TextBox
                    cols={10}
                    rows={5}
                    value={testcase.expectedOutput}
                    placeholder="Expected Output"
                    handleChange={((val: string) => handleTestCaseData('expectedOutput', val))}
                />
                <Input type='boolean' placeholder='Is it a Sample testcase' value={testcase.isSample} handleInput={(val: boolean) => handleTestCaseData('isSample', val)} />
            </FormContainer>
        </div>;
    };

    const showProblems = () => {
        return <div className="problems__content">
            {problems.length ? problems.map((problem: any, index: number) => (
                <div className="problems__container--content" key={index}>
                    <Problem data={problem} count={index} />
                    <div className='problems__problem--tail'>
                        <FillButton
                            text="Add Testcase"
                            type={1}
                            disable={formOpen}
                            onClickHandler={() => {
                                setCurrProblemId(problem.problemId);
                                setTestcaseFormOpen(true);
                            }}
                        />
                    </div>
                </div>
            )) :
                <h1 className="h h--4 text--disabled text--center"> No Problems added yet.</h1>
            }
        </div>;
    };

    const getEvalHead = () => {
        return <div className="evaluations__head" style={{ background: currEvalState.color }}>
            <h1 className="h h--l2">Problems</h1>
            <h3 className="h h--4">{startDate} | {currEvalState.description} | {startTime} - {endTime}</h3>
        </div>;
    };


    const currPath = useLocation().pathname;
    const oneBackPath = currPath.split('/').slice(0, -1).join('/');

    const routeList = [
        { path: currPath, title: 'Problems' },
        { path: oneBackPath + '/reports', title: 'Reports' },
    ];

    return (
        <div className='d--f'>
            <div className="teacher__content">
                <Navbar navList={routeList} />
                <div className="problems">
                    <div className="problems__container">
                        {getEvalHead()}
                        <div className="evaluations__body">
                            <div>
                                <FillButton
                                    text="Add Problem"
                                    color={currEvalState.color}
                                    type={2}
                                    onClickHandler={() => setFormOpen(true)}
                                    disable={testcaseFormOpen} />
                            </div>
                            {showProblems()}
                        </div>
                    </div>
                </div>
            </div>
            {getTestCaseForm()}
            {getProblemForm()}
        </div>
    );
};
export default Problems;
