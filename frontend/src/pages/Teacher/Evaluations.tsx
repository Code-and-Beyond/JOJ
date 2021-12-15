import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import FillButton from '../../components/Button/Fill';
import Evaluation from '../../components/Evaluation/Evaluation';
import FormContainer from '../../components/Form/FormContainer';
import Input from '../../components/Input/Input.component';
import Navbar from '../../components/Navbar/Navbar';

type EvaluationsProps = {};

const Evaluations: React.FC<EvaluationsProps> = () => {
    const navigate = useNavigate();
    const [formOpen, setFormOpen] = useState(false);
    const [evaluation] = useState({
        title: '',
        description: '',
        start: '',
        end: '',
    });
    const currPath = useLocation().pathname;
    const oneBackPath = currPath.split('/').slice(0, -1).join('/');

    const routeList = [
        { path: currPath, title: 'Evaluations' },
        { path: oneBackPath + '/people', title: 'People' },
    ];

    const getForm = () => {
        return (
            formOpen && (
                <div className="teacher__form">
                    <FormContainer
                        title="Create Evaluation"
                        onAdd={() => console.log('add')}
                        onCancel={() => setFormOpen(false)}
                    >
                        <Input
                            type="text"
                            placeholder="Evaluation Title"
                            value={evaluation.title}
                            handleInput={() => console.log('hello')}
                        />
                        <Input
                            type="text"
                            placeholder="Description"
                            value={evaluation.description}
                            handleInput={() => console.log('code')}
                        />
                        <Input
                            type="date"
                            placeholder="Start Time"
                            value={evaluation.start}
                            handleInput={() => console.log('code')}
                        />
                        <Input
                            type="datee"
                            placeholder="End Time"
                            value={evaluation.end}
                            handleInput={() => console.log('code')}
                        />
                    </FormContainer>
                </div>
            )
        );
    };

    return (
        <div className="d--f">
            <div className="teacher__content">
                <Navbar navList={routeList} />
                <div className="evaluations">
                    <div className="evaluations__container">
                        <div className="evaluations__head">
                            <h1 className="h h--l2">
                                Evaluations - Introduction to Blockchain
                            </h1>
                            <h3 className="h h--4">201B32818</h3>
                        </div>
                        <div className="evaluations__body">
                            <div>
                                <div className="evaluations__body--upcoming">
                                    <h2 className="a a--2">Upcoming</h2>
                                    <p className="b b--3">
                                        No upcoming evaluations!
                                    </p>
                                </div>
                                <FillButton
                                    text="Create Evaluation"
                                    type={2}
                                    onClickHandler={() => setFormOpen(true)}
                                />
                            </div>
                            <div>
                                <Evaluation
                                    onClickHandler={() =>
                                        navigate('13/problems')
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {getForm()}
        </div>
    );
};
export default Evaluations;
