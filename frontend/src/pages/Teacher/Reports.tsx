import React from 'react';
import { useLocation } from 'react-router';
import FillButton from '../../components/Button/Fill';
import Navbar from '../../components/Navbar/Navbar';

type ReportsProps = {};

const Reports: React.FC<ReportsProps> = (props) => {
    const currPath = useLocation().pathname;
    const oneBackPath = currPath.split('/').slice(0, -1).join('/');

    const routeList = [
        { path: oneBackPath + '/problems', title: 'Problems' },
        { path: currPath, title: 'Reports' },
    ];

    return (
        <div>
            <Navbar navList={routeList} />
            <h1>Reports will be available after the evalutaion.</h1>
        </div>
    );
};
export default Reports;
