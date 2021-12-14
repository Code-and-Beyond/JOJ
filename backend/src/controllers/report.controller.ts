import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

// get report of an evaluation
const getReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { evaluationId } = req.params;
        const client = await Connect();
        const report = await Query(
            client,
            'SELECT * FROM "reports" WHERE "evaluationId" = $1',
            [evaluationId]
        );
        res.status(200).json({
            report: report.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// create report entry
const createReportEntry = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const evalReportObj = {
            ...req.body,
            evaluationId: req.params.evaluationId,
            uid: req.params.uid,
        };
        const client = await Connect();
        const reportEntry = await Query(
            client,
            'INSERT INTO "reports" ("evaluationId", "uid", "score", "plagPercentage", "marks", "comments") VALUES ($1, $2, $3, $4, $5, $6)',
            [
                evalReportObj.evaluationId,
                evalReportObj.uid,
                evalReportObj.score,
                evalReportObj.plagPercentage,
                evalReportObj.marks,
                evalReportObj.comments,
            ]
        );
        res.status(201).json({
            reportEntry: reportEntry.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// update report entry
const updateReportEntry = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE "reports" SET ';
            let queryArray: any = [];

            const updateColumns = (colArray: string[]) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `"${colName}" = $${queryArray.length + 1}, `;
                    queryArray.push(req.body[colName]);
                }
            };

            updateColumns(['score', 'plagPercentage', 'marks', 'comments']);

            queryString = queryString.substring(0, queryString.length - 2);
            queryString += ` WHERE "evaluationId" = '${req.params.evaluationId}' AND "uid" = '${req.params.uid}'`;

            return { queryString, queryArray };
        };

        const args = computeUpdateQuery();
        const client = await Connect();
        const reportEntry = await Query(
            client,
            args.queryString,
            args.queryArray
        );
        res.status(200).json({
            reportEntry: reportEntry.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

export default {
    getReport,
    createReportEntry,
    updateReportEntry,
};
