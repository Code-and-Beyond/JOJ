import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

import { v4 as uuidv4 } from 'uuid';

// update a contest
const updateContest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE "contests" SET ';
            let queryArray: any = [];

            const updateColumns = (colArray: string[]) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `"${colName}" = $${queryArray.length + 1}, `;
                    queryArray.push(req.body[colName]);
                }
            };

            updateColumns(['name', 'startTime', 'endTime', 'description']);

            queryString = queryString.substring(0, queryString.length - 2);
            queryString += ` WHERE "contestId" = '${req.params.contestId}'`;

            return { queryString, queryArray };
        };

        const args = computeUpdateQuery();
        const client = await Connect();
        const contest = await Query(client, args.queryString, args.queryArray);
        res.status(200).json({
            contest: contest.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// get contest problems
const getContestProblems = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { contestId } = req.params;
        const client = await Connect();
        const problems = await Query(
            client,
            'SELECT * FROM "problems" WHERE "contestId" = $1',
            [contestId]
        );
        res.status(200).json({
            problems: problems.rows,
            count: problems.rows.length,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// create a contest problem
const createContestProblem = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const problemObj = {
            ...req.body,
            problemId: uuidv4(),
            contestId: req.params.contestId,
        };
        const client = await Connect();
        const problem = await Query(
            client,
            'INSERT INTO "problems" ("problemId", "contestId", "name", "statement", "input", "output", "constraints", "timeLimit", "memoryLimit", "explanation") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            [
                problemObj.problemId,
                problemObj.contestId,
                problemObj.name,
                problemObj.statement,
                problemObj.input,
                problemObj.output,
                problemObj.constraints,
                problemObj.timeLimit,
                problemObj.memoryLimit,
                problemObj.explanation,
            ]
        );
        res.status(201).json({
            problem: problem.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// get contest submissions
const getContestSubmissions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { contestId } = req.params;
        const client = await Connect();
        const submissions = await Query(
            client,
            'SELECT "submissions".* FROM "submissions" INNER JOIN "problems" ON "problems"."contestId" = $1 AND "submissions"."problemId" = "problems"."problemId";',
            [contestId]
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
    updateContest,
    getContestProblems,
    createContestProblem,
    getContestSubmissions,
};
