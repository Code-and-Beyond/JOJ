import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import FillButton from '../../components/Button/Fill';
import { RootState } from '../../store/reducers/root';
import moment from 'moment';


type InstructionsProps = {

};


const Instructions: React.FC<InstructionsProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currEval = useSelector((state: RootState) => state.eval.currentEvalution);
    const duration = moment(currEval.endTime).diff(moment(currEval.startTime), 'hours');

    useEffect(() => {
        if (Object.keys(currEval).length === 0) {
            navigate(-1);
        }
    }, []);

    const checkDisable = () => {
        const currTime = new Date(0).getTime();
        const startTime = new Date(currEval.startTime).getTime();
        const endTime = new Date(currEval.endTime).getTime();

        // console.log(currTime, startTime, endTime);

        if (currTime >= startTime && currTime < endTime) {
            return false;
        }
        return false;
    };

    const onJoinTest = () => {
        navigate(`/test/${currEval.evaluationId}/problems`);
    };

    return (
        <div className='login instructions'>
            <div className='login__container card instructions__container'>
                <div className='login__container--head instructions__container--head'>
                    <h1 className="h h--2">JOJ: The Jaypee Online Judge</h1>
                </div>
                <div className='instructions__container--body'>
                    <h2 className='h h--4 text--center'>{currEval.name}</h2>
                    <div>
                        <div className='d--f jc--sb u-m-v-m'>
                            <h3 className='h h--4'>Total Marks: {currEval.totalMarks} </h3>
                            <h3 className='h h--4'>Duration: {duration} hrs</h3>
                        </div>
                        <h4 className='b b--2 u-m-b-m'>When you start the test, it confirms that you :</h4>
                        <ol className='a a--2'>
                            <li><p className='a a--2'>are aware of the basic online test environment functionalities</p></li>
                            <li><p className='a a--2'>will not communicate with other participants and share ideas of solutions</p></li>
                            <li><p className='a a--2'>will not use third-party code</p></li>
                            <li><p className='a a--2'>will not use multiple accounts and will take part in the contest using your personal and the single account.</p></li>
                            <li><p className='a a--2'>will not attempt to deliberately destabilize the testing process and try to hack the contest system in any form</p></li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className='instructions__footer'>
                <FillButton text='Join Test' extraStyle='h h--1' disable={checkDisable()} type={1} onClickHandler={onJoinTest} />
            </div>
        </div>
    );
};
export default Instructions;