import React from 'react';
import Icon from '../Icon/Icon';

type CourseMemberProps = {
    onClickHandler?: React.MouseEventHandler<HTMLDivElement> | undefined;
    courseMember: any;
};

const CourseMember: React.FC<CourseMemberProps> = (props) => {
    const { courseMember } = props;

    return (
        <div className="eval" /* onClick={props.onClickHandler} */>
            <div className="eval__icon">
                <div>
                    <Icon src={courseMember.image} alt="profile picture" size="xs" />
                </div>
            </div>
            <div className="eval__content">
                <h3 className="a a--2">{courseMember.fullname + ' | ' + courseMember.role}</h3>
            </div>
        </div>
    );
};

export default CourseMember;