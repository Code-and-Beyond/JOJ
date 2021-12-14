import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

// update an eval
const updateEvaluation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE "evaluations" SET ';
            let queryArray: any = [];

            const updateColumns = (colArray: string[]) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `"${colName}" = $${queryArray.length + 1}, `;
                    queryArray.push(req.body[colName]);
                }
            };

            updateColumns([
                'name',
                'startTime',
                'endTime',
                'description',
                'totalMarks',
            ]);

            queryString = queryString.substring(0, queryString.length - 2);
            queryString += ` WHERE "evaluationId" = '${req.params.evaluationId}'`;

            return { queryString, queryArray };
        };

        const args = computeUpdateQuery();
        const client = await Connect();
        const evaluation = await Query(
            client,
            args.queryString,
            args.queryArray
        );
        res.status(200).json({
            evaluation: evaluation.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// get evaluation submissions
const getEvaluationSubmissions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { evaluationId } = req.params;
        const client = await Connect();
        const submissions = await Query(
            client,
            'SELECT "submissions".* FROM "submissions" INNER JOIN "problems" ON "problems"."contestId" = $1 AND "submissions"."problemId" = "problems"."problemId"',
            [evaluationId]
        );
        res.status(200).json({
            submissions: submissions.rows,
            count: submissions.rows.length,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

export default {
    updateEvaluation,
    getEvaluationSubmissions,
};
