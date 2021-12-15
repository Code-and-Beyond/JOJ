import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import FillButton from '../../components/Button/Fill';
import Evaluation from '../../components/Evaluation/Evaluation';
import FormContainer from '../../components/Form/FormContainer';
import Navbar from '../../components/Navbar/Navbar';
import Problem from '../../components/Problem/Problem';
import Input from '../../components/Input/Input.component';


type ProblemsProps = {};

const Problems: React.FC<ProblemsProps> = () => {
    const [formOpen, setFormOpen] = useState(false);
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
    const dispatch = useDispatch();

    const handleProblemData = (type: string, val: string) => {
        setData({ ...data, [type]: val });
    };

    const getForm = () => {
        return formOpen && <div className='teacher__form'>
            <FormContainer title='Add Problem' onAdd={() => { setFormOpen(false); }} onCancel={() => setFormOpen(false)}>
                <Input type='text' placeholder='Problem Name' value={data.name} handleInput={(val: string) => handleProblemData('name', val)} />
                <Input type='text' placeholder='Problem Statement' value={data.statement} handleInput={(val: string) => handleProblemData('statement', val)} />
                <Input type='text' placeholder='Input Format' value={data.input} handleInput={(val: string) => handleProblemData('input', val)} />
                <Input type='text' placeholder='Output Format' value={data.output} handleInput={(val: string) => handleProblemData('output', val)} />
                <Input type='text' placeholder='Constraints' value={data.constraints} handleInput={(val: string) => handleProblemData('constraints', val)} />
                <Input type='text' placeholder='Explanation' value={data.timeLimit} handleInput={(val: string) => handleProblemData('explanation', val)} />
                <Input type='text' placeholder='Time Limit' value={data.timeLimit} handleInput={(val: string) => handleProblemData('timeLimit', val)} />
                <Input type='text' placeholder='Memory Limit' value={data.timeLimit} handleInput={(val: string) => handleProblemData('memoryLimit', val)} />
            </FormContainer>
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
                        <div className="evaluations__head">
                            <h1 className="h h--l2">Problems - Lab test 2</h1>
                            <h3 className="h h--4">Dec 20 | 4:30pm - 5:00pm</h3>
                        </div>
                        <div className="evaluations__body">
                            <div>
                                <FillButton
                                    text="Add Problem"
                                    type={2}
                                    onClickHandler={() => setFormOpen(true)}
                                />
                            </div>
                            <div>
                                <Evaluation
                                // onClickHandler={() =>
                                //     navigate('13/problems')
                                // }
                                />
                            </div>

                            {/* <div className="problems__content">
                            <h1 className="h h--4 text--disabled text--center">
                            No Problems added yet.
                            </h1>
                            <div className="problems__container--content">
                                <Problem />
                                </div>
                                <div className="problems__container--content">
                                <Problem />
                            </div>
                            <div className="problems__container--content">
                            <Problem />
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {getForm()}
        </div>
    );
};
export default Problems;
