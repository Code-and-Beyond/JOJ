import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import CourseMember from '../../components/CourseMember/CourseMember';
import Navbar from '../../components/Navbar/Navbar';
import { RootState } from '../../store/reducers/root';
import { getCourseMembersService } from '../../services/courseMembers';

type PeopleProps = {};

const People: React.FC<PeopleProps> = () => {
    const dispatch = useDispatch();

    const currCourseState = useSelector(
        (state: RootState) => state.crs.currentCourse
    );

    const currPath = useLocation().pathname;
    const oneBackPath = currPath.split('/').slice(0, -1).join('/');
    const routeList = [
        { path: oneBackPath + '/evaluations', title: 'Evaluations' },
        { path: currPath, title: 'People' },
    ];

    const [people, setPeople] = useState([]);

    // get all members of current course
    const fetchAllCourseMembers = async (courseId: string) => {
        const response = await getCourseMembersService(courseId, dispatch);
        setPeople(response.courseMembers);
    };

    useEffect(() => {
        console.log(currCourseState);
        fetchAllCourseMembers(currCourseState.courseId);
    }, []);

    return (
        <div className="teacher__content">
            <Navbar navList={routeList} />
            <div className="evaluations">
                <div className="evaluations__container">
                    <div className="evaluations__body">
                        {people.map((courseMember: any, index: number) => (
                            <CourseMember
                                key={index}
                                courseMember={courseMember}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default People;
