import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import Icon from '../../components/Icon/Icon';
import Input from '../../components/Input/Input.component';
import Navbar from '../../components/Navbar/Navbar';
import Table from '../../components/Table/Table';
import updateIcon from '../../assets/icons/update.png';

import { getTestProblemsService } from '../../services/problem';
import { getEvaluationReportService } from '../../services/reports';
import { getUserProblemSubmissions } from '../../services/submission';

type ReportsProps = {};

const Reports: React.FC<ReportsProps> = (props) => {
    const currPath = useLocation().pathname;
    const oneBackPath = currPath.split('/').slice(0, -1).join('/');

    const routeList = [
        { path: oneBackPath + '/problems', title: 'Problems' },
        { path: currPath, title: 'Reports' },
    ];

    const dispatch = useDispatch();
    const [report, setReport] = useState([]);
    const [problems, setProblems] = useState([]);

    const fetchUserProblemSubmissions = async (uid: string, problemId: string) => {
        const res = await getUserProblemSubmissions(uid, problemId, dispatch);
    };

    const fetchEvaluationProblems = async () => {
        const evalSubstring = 'evaluations/';
        const evaluationId = currPath.substring(currPath.indexOf(evalSubstring) + evalSubstring.length, currPath.indexOf('/reports'));
        console.log(evaluationId);
        const res: any = await getTestProblemsService(evaluationId, dispatch);
        setProblems(res);
    };

    const fetchEvaluationReport = async () => {
        const evalSubstring = 'evaluations/';
        const evaluationId = currPath.substring(currPath.indexOf(evalSubstring) + evalSubstring.length, currPath.indexOf('/reports'));
        console.log(evaluationId);
        const response = await getEvaluationReportService(evaluationId, dispatch);
        setReport(response.report);
        console.log(response);
    };

    useEffect(() => {
        fetchEvaluationReport();
        fetchEvaluationProblems();
    }, []);

    const getUpdateInput = (data: number | string, placeholder: string, type: string) => {
        return <div className='d--f ai--c'>
            <Input
                type={type}
                placeholder={placeholder}
                value={data}
                extraStyle='reports__input'
                handleInput={(val: string) => console.log('update marks data in state')}
            />
            <Icon
                src={updateIcon}
                alt="update icon"
                size="xs"
                extraStyle='u-c-pointer'
                onClickHandler={() => console.log('call update api')}
            />
        </div>;
    };

    const showReport = () => {
        console.log(report); // TODO: remove this
        let dataList: any = [
            { head: 'Name', entries: [] },
            { head: 'Enrollment', entries: [] },
            { head: 'Test Score', entries: [] },
            { head: 'Student Marks', entries: [] },
            { head: 'Comments', entries: [] }
        ];
        report.forEach((entry: any) => {
            dataList[0].entries.push(entry.fname);
            dataList[1].entries.push(entry.lname);
            dataList[2].entries.push(entry.score);
            dataList[3].entries.push(getUpdateInput(entry.marks, 'Enter Marks', 'number'));
            dataList[4].entries.push(getUpdateInput(entry.comments, 'Enter Comments', 'text'));

        });

        return <Table dataList={dataList} />;
    };

    return (
        <div>
            <Navbar navList={routeList} />
            <div>
                {report.length ? showReport() : null}
            </div>
        </div>
    );
};
export default Reports;
