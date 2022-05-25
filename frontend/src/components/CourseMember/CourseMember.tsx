import { Avatar } from '@material-ui/core';
import React from 'react';
import Icon from '../Icon/Icon';

type CourseMemberProps = {
    onClickHandler?: React.MouseEventHandler<HTMLDivElement> | undefined;
    courseMember: any;
};

const CourseMember: React.FC<CourseMemberProps> = (props) => {
    const { courseMember } = props;

    return (
        <div className="eval ai--c" /* onClick={props.onClickHandler} */>
            <Avatar src={courseMember.image} className='u-m-r-s'>
                <h2 className="h h--2 h--white">
                    {courseMember.fullname
                        ? courseMember.fullname.slice(0, 1)
                        : null}
                </h2>
            </Avatar>
            <div className="eval__content">
                <h3 className="a a--2">{courseMember.fullname}</h3>
                <h3 className="a a--2 text--disabled">{courseMember.role}</h3>
            </div>
        </div>
    );
};

export default CourseMember;