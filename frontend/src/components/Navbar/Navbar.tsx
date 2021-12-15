import React from 'react';
import { Avatar } from '@material-ui/core';
import Icon from '../Icon/Icon';

import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/root';

import docsIcon from '../../assets/icons/docs.png';

type NavbarProps = {
    navList: Array<any>;
};

const Navbar: React.FC<NavbarProps> = (props) => {
    const { navList } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const userState = useSelector((state: RootState) => state.user);

    const getActiveClass = (currPath: string) => {
        const path = location.pathname;
        // console.log(currPath, path);

        let classes: string =
            path === currPath ? 'b b--2 navbar__nav--active' : 'b b--2';
        return classes;
    };

    return (
        <div className="navbar">
            <div className="navbar__title">
                <Icon src={docsIcon} alt="docs icon" size="s" />
                <h2 className="h h--4">Introduction to blockchain</h2>
            </div>
            <div className="navbar__nav">
                {navList.map((item, index) => (
                    <h3
                        className={getActiveClass(item.path)}
                        key={index}
                        onClick={() => {
                            navigate(item.path);
                            // console.log(item);
                        }}
                    >
                        {item.title}
                    </h3>
                ))}
            </div>
            <div className="navbar__avatar">
                <Avatar src={userState.info.image}>
                    <h2 className="h h--2 h--white">
                        {userState.info.fname
                            ? userState.info.fname.slice(0, 1)
                            : null}
                    </h2>
                </Avatar>
            </div>
        </div>
    );
};
export default Navbar;
