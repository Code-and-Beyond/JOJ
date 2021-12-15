import React from 'react';
import Icon from '../../components/Icon/Icon';
import moment from 'moment';

import bookmarkIcon from '../../assets/icons/bookmark.png';
import { handleOffset } from '../../services/helper';

type EvaluationProps = {
    onClickHandler?: React.MouseEventHandler<HTMLDivElement> | undefined;
    evaluation: any;
};

const Evaluation: React.FC<EvaluationProps> = (props) => {
    const { evaluation } = props;
    const startTime = moment(handleOffset(evaluation.startTime)).format('LT');
    const endTime = moment(handleOffset(evaluation.endTime)).format('LT');
    const startDate = moment(handleOffset(evaluation.startTime)).format('ll').split(',')[0];

    return (
        <div className="eval" onClick={props.onClickHandler}>
            <div className="eval__icon">
                <div>
                    <Icon src={bookmarkIcon} alt="test icon" size="xs" />
                </div>
            </div>
            <div className="eval__content">
                <h3 className="a a--2">{evaluation.name + ' - ' + evaluation.description}</h3>
                <h5 className="b b--4">{startDate} | {startTime} - {endTime}</h5>
            </div>
        </div>
    );
};
export default Evaluation;
