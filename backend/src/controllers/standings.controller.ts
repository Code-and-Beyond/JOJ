import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

// get standings of a contest
const getStandings = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { contestId } = req.params;
        const client = await Connect();
        const standings = await Query(
            client,
            'SELECT * FROM "standings" WHERE "contestId" = $1',
            [contestId]
        );
        res.status(200).json({
            standings: standings.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// create standings entry
const createStandingsEntry = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const standingsEntryObj = {
            ...req.body,
            contestId: req.params.contestId,
            uid: req.params.uid,
        };
        const client = await Connect();
        const standingsEntry = await Query(
            client,
            'INSERT INTO "standings" ("contestId", "uid", "score", "plagPercentage") VALUES ($1, $2, $3, $4)',
            [
                standingsEntryObj.contestId,
                standingsEntryObj.uid,
                standingsEntryObj.score,
                standingsEntryObj.plagPercentage,
            ]
        );
        res.status(201).json({
            standingsEntry: standingsEntry.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// update standings entry
const updateStandingsEntry = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE "standings" SET ';
            let queryArray: any = [];

            const updateColumns = (colArray: string[]) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `"${colName}" = $${queryArray.length + 1}, `;
                    queryArray.push(req.body[colName]);
                }
            };

            updateColumns(['score', 'plagPercentage']);

            queryString = queryString.substring(0, queryString.length - 2);
            queryString += ` WHERE "contestId" = '${req.params.contestId}' AND "uid" = '${req.params.uid}'`;

            return { queryString, queryArray };
        };

        const args = computeUpdateQuery();
        const client = await Connect();
        const standingsEntry = await Query(
            client,
            args.queryString,
            args.queryArray
        );
        res.status(200).json({
            standingsEntry: standingsEntry.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

export default {
    getStandings,
    createStandingsEntry,
    updateStandingsEntry,
};
