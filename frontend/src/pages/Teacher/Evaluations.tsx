import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import FillButton from '../../components/Button/Fill';
import Evaluation from '../../components/Evaluation/Evaluation';
import FormContainer from '../../components/Form/FormContainer';
import Input from '../../components/Input/Input.component';
import Navbar from '../../components/Navbar/Navbar';
import { createCourseEvaluation, getCourseEvaluations } from '../../services/evaluations';
import { setCurrentEvaluation } from '../../store/actions';
import { RootState } from '../../store/reducers/root';

type EvaluationsProps = {};

const Evaluations: React.FC<EvaluationsProps> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formOpen, setFormOpen] = useState(false);
    const currCourseState = useSelector((state: RootState) => state.crs.currentCourse);
    const evalState = useSelector((state: RootState) => state.eval);

    const [evaluation, setEvaluation] = useState({
        name: '',
        description: '',
        totalMarks: '',
        startTime: '',
        endTime: '',
    });
    const currPath = useLocation().pathname;
    const oneBackPath = currPath.split('/').slice(0, -1).join('/');

    const routeList = [
        { path: currPath, title: 'Evaluations' },
        { path: oneBackPath + '/people', title: 'People' },
    ];

    // get all evaluations of current course
    const fetchAllEvaluations = async (courseId: string) => {
        await getCourseEvaluations(courseId, dispatch);
    };


    useEffect(() => {
        console.log(currCourseState);
        if (Object.keys(currCourseState).length === 0) {
            navigate(-1);
        } else if (evalState.evaluations.length === 0) {
            fetchAllEvaluations(currCourseState.courseId);
        }
    }, []);



    const handleEvaluationData = (type: string, val: string | number) => {
        setEvaluation({ ...evaluation, [type]: val });
    };

    const handleCreateEvaluation = async () => {
        setFormOpen(false);
        await createCourseEvaluation(currCourseState.courseId, evaluation, dispatch);
        fetchAllEvaluations(currCourseState.courseId);
    };


    const handleEvalClick = (evaluation: any) => {
        dispatch(setCurrentEvaluation({ ...evaluation, color: currCourseState.color }));
        navigate(`${evaluation.evaluationId}/problems`);
    };


    const getForm = () => {
        return (
            formOpen && (
                <div className="teacher__form">
                    <FormContainer
                        title="Create Evaluation"
                        onAdd={handleCreateEvaluation}
                        onCancel={() => setFormOpen(false)}
                    >
                        <Input type="text" placeholder="Evaluation Title" value={evaluation.name} handleInput={(val: string) => handleEvaluationData('name', val)} />
                        <Input type="text" placeholder="Description" value={evaluation.description} handleInput={(val: string) => handleEvaluationData('description', val)} />
                        <Input type="text" placeholder="Total Marks" value={evaluation.totalMarks} handleInput={(val: string) => handleEvaluationData('totalMarks', val)} />
                        <Input type="datetime-local" placeholder="Start Time" value={evaluation.startTime} handleInput={(val: string) => handleEvaluationData('startTime', val)} />
                        <Input type="datetime-local" placeholder="End Time" value={evaluation.endTime} handleInput={(val: string) => handleEvaluationData('endTime', val)} />
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
                        <div className="evaluations__head" style={{ background: currCourseState.color }}>
                            <h1 className="h h--l2">
                                Evaluations
                            </h1>
                            <h3 className="h h--4">{currCourseState.subjectCode}</h3>
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
                                    color={currCourseState.color}
                                    text="Create Evaluation"
                                    type={2}
                                    onClickHandler={() => setFormOpen(true)}
                                />
                            </div>
                            <div>
                                {evalState.evaluations.map((evaluation: any, index: number) =>
                                    <Evaluation
                                        key={index}
                                        evaluation={evaluation} onClickHandler={() => handleEvalClick(evaluation)}
                                    />)}
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
