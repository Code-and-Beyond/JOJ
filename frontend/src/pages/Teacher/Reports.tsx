import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import FillButton from '../../components/Button/Fill';
import Navbar from '../../components/Navbar/Navbar';
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
    }

    const fetchEvaluationProblems = async () => {
        const evalSubstring = 'evaluations/';
        const evaluationId = currPath.substring(currPath.indexOf(evalSubstring) + evalSubstring.length, currPath.indexOf('/reports'));
        console.log(evaluationId);
        const res: any = await getTestProblemsService(evaluationId, dispatch);
        setProblems(res);
    }

    const fetchEvaluationReport = async () => {
        const evalSubstring = 'evaluations/';
        const evaluationId = currPath.substring(currPath.indexOf(evalSubstring) + evalSubstring.length, currPath.indexOf('/reports'));
        console.log(evaluationId);
        const response = await getEvaluationReportService(evaluationId, dispatch);
        setReport(response.report);
        console.log(response);
    }

    useEffect(() => {
        fetchEvaluationReport();
        fetchEvaluationProblems();
    }, []);

    const showReport = () => {
        return report.map((reportEntry: any, index: number) => (
            <li key={index}>
                {reportEntry.fullname} | {reportEntry.score}
            </li>
        ))
    }

    return (
        <div>
            <Navbar navList={routeList} />
            {report.length ? showReport() : null}
        </div>
    );
};
export default Reports;
