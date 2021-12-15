import React from 'react';
import Icon from '../../components/Icon/Icon';

import bookmarkIcon from '../../assets/icons/bookmark.png';

type EvaluationProps = {
    onClickHandler?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

const Evaluation: React.FC<EvaluationProps> = (props) => {
    return (
        <div className="eval" onClick={props.onClickHandler}>
            <div className="eval__icon">
                <div>
                    <Icon src={bookmarkIcon} alt="test icon" size="xs" />
                </div>
            </div>
            <div className="eval__content">
                <h3 className="a a--2">Lab Test 2 - B7, B8</h3>
                <h5 className="b b--4">Dec 9 | 4:00pm - 4:30pm</h5>
            </div>
        </div>
    );
};
export default Evaluation;
