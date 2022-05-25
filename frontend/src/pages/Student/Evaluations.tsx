import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import Evaluation from '../../components/Evaluation/Evaluation';
import Navbar from '../../components/Navbar/Navbar';
import { getCourseEvaluations } from '../../services/evaluations';
import { setCurrentEvaluation } from '../../store/actions';
import { RootState } from '../../store/reducers/root';

type EvaluationsProps = {};

const Evaluations: React.FC<EvaluationsProps> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currCourseState = useSelector((state: RootState) => state.crs.currentCourse);
    const evalState = useSelector((state: RootState) => state.eval);

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
        } else {
            fetchAllEvaluations(currCourseState.courseId);
        }
    }, []);

    const handleEvalClick = (evaluation: any) => {
        dispatch(setCurrentEvaluation({ ...evaluation, color: currCourseState.color }));
        navigate(`/test/${evaluation.evaluationId}}/instructions`);
    };

    return (
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
                        <div className="evaluations__body--upcoming">
                            <h2 className="a a--2">Upcoming</h2>
                            <p className="b b--3">
                                No upcoming evaluations!
                            </p>
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
    );
};

export default Evaluations;