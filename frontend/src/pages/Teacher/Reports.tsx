import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import Icon from '../../components/Icon/Icon';
import Input from '../../components/Input/Input.component';
import Navbar from '../../components/Navbar/Navbar';
import Table from '../../components/Table/Table';
import updateIcon from '../../assets/icons/update.png';

import { getTestProblemsService } from '../../services/problem';
import { getEvaluationReportService, updateReportEntryService } from '../../services/reports';
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
    const [report, setReport] = useState<any>([]);
    const [problems, setProblems] = useState([]);
    const [reportInputs, setReportInputs] = useState<any>([]);
    const [inputsNotInitialized, setInputsInitialized] = useState(true);

    const fetchUserProblemSubmissions = async (uid: string, problemId: string) => {
        const res = await getUserProblemSubmissions(uid, problemId, dispatch);
    };

    const getEvaluationId = () => {
        const evalSubstring = 'evaluations/';
        const evaluationId = currPath.substring(currPath.indexOf(evalSubstring) + evalSubstring.length, currPath.indexOf('/reports'));
        console.log(evaluationId);
        return evaluationId;
    }

    const fetchEvaluationProblems = async () => {
        const res: any = await getTestProblemsService(getEvaluationId(), dispatch);
        setProblems(res);
    };

    const initReportInputs = (report: any) => {
        console.log("initReportInputs");
        let tempReportInputs: any = [];
        for (let entry of report) {
            tempReportInputs.push({
                marks: entry.marks,
                comments: entry.comments,
            })
        }
        console.log(tempReportInputs);
        setReportInputs(tempReportInputs);
        setInputsInitialized(false);
    }

    const fetchEvaluationReport = async () => {
        const response = await getEvaluationReportService(getEvaluationId(), dispatch);
        setReport(response.report);
        if (inputsNotInitialized) {
            initReportInputs(response.report);
        }
        console.log(response);
    };

    useEffect(() => {
        fetchEvaluationReport();
        fetchEvaluationProblems();
    }, []);

    const updateReportInput = (index: any, reportEntryKey: any, val: any) => {
        let tempReportInputs = reportInputs;
        tempReportInputs[index][reportEntryKey] = val;
        console.log(tempReportInputs[index][reportEntryKey]);
        console.log(val);
        setReportInputs(tempReportInputs);
    }

    const updateReportEntry = async (index: any, reportEntryKey: any) => {
        const uid = report[index].uid;
        const reportEntryObj = {
            [reportEntryKey]: reportInputs[index][reportEntryKey],
        };
        await updateReportEntryService(getEvaluationId(), uid, reportEntryObj, dispatch);
        console.log("entry updated!");
    }

    const getUpdateInput = (data: number | string, placeholder: string, type: string, index: number, reportInputKey: string) => {
        console.log(data, index, reportInputKey);
        return <div className='d--f ai--c'>
            <Input
                type={type}
                placeholder={placeholder}
                value={data}
                extraStyle='reports__input'
                handleInput={(val: string) => updateReportInput(index, reportInputKey, val)}
            />
            <Icon
                src={updateIcon}
                alt="update icon"
                size="xs"
                extraStyle='u-c-pointer'
                onClickHandler={() => updateReportEntry(index, reportInputKey)}
            />
        </div>;
    };

    const showReport = () => {
        console.log(report); // TODO: remove this
        console.log(reportInputs);
        let dataList: any = [
            { head: 'Name', entries: [] },
            // { head: 'Enrollment', entries: [] },
            { head: 'Test Score', entries: [] },
            { head: 'Student Marks', entries: [] },
            { head: 'Comments', entries: [] }
        ];
        report.forEach((entry: any, entryIndex: number) => {
            dataList[0].entries.push(entry.fullname);
            // dataList[1].entries.push(entry.lname);
            dataList[1].entries.push(entry.score);  
            dataList[2].entries.push(getUpdateInput(reportInputs[entryIndex]?.marks, 'Enter Marks', 'number', entryIndex, 'marks'));
            dataList[3].entries.push(getUpdateInput(reportInputs[entryIndex]?.comments, 'Enter Comments', 'text', entryIndex, 'comments'));
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
