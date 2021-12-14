import { NextFunction, Request, Response } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

import { v4 as uuidv4 } from 'uuid';

// get all clubs
const getAllClubs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = await Connect();
        const clubs = await Query(client, 'SELECT * FROM "clubs"');
        res.status(200).json({
            clubs: clubs.rows,
            count: clubs.rows.length,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// get club by club id
const getClubById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clubId } = req.params;
        const client = await Connect();
        const club = await Query(
            client,
            'SELECT * FROM "clubs" WHERE "clubId" = $1',
            [clubId]
        );
        res.status(200).json({
            club: club.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// create a club
const createClub = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clubObj = {
            ...req.body,
            clubId: uuidv4(),
            creationTime: new Date(),
        };
        const client = await Connect();
        const club = await Query(
            client,
            'INSERT INTO "clubs" ("clubId", "name", "description", "supervisorId", "creationTime") VALUES ($1, $2, $3, $4, $5)',
            [
                clubObj.clubId,
                clubObj.name,
                clubObj.description,
                clubObj.supervisorId,
                clubObj.creationTime,
            ]
        );
        res.status(201).json({
            club: club.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// update a club
const updateClub = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE "clubs" SET ';
            let queryArray: any = [];

            const updateColumns = (colArray: string[]) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `"${colName}" = $${queryArray.length + 1}, `;
                    queryArray.push(req.body[colName]);
                }
            };

            updateColumns(['name', 'description']);

            queryString = queryString.substring(0, queryString.length - 2);
            queryString += ` WHERE "clubId" = '${req.params.clubId}'`;

            return { queryString, queryArray };
        };

        const args = computeUpdateQuery();
        const client = await Connect();
        const club = await Query(client, args.queryString, args.queryArray);
        res.status(200).json({
            club: club.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// get club contests
const getClubContests = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { clubId } = req.params;
        const client = await Connect();
        const contests = await Query(
            client,
            'SELECT * FROM "contests" WHERE "clubId" = $1',
            [clubId]
        );
        res.status(200).json({
            contests: contests.rows,
            count: contests.rows.length,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// create club contest
const createClubContest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const contestObj = {
            ...req.body,
            clubId: req.params.clubId,
            contestId: uuidv4(),
        };
        const client = await Connect();
        const contest = await Query(
            client,
            'INSERT INTO "contests" ("contestId", "clubId", "name", "startTime", "endTime", "description") VALUES ($1, $2, $3, $4, $5, $6)',
            [
                contestObj.contestId,
                contestObj.clubId,
                contestObj.name,
                contestObj.startTime,
                contestObj.endTime,
                contestObj.description,
            ]
        );
        res.status(201).json({
            contest: contest.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

export default {
    getAllClubs,
    getClubById,
    createClub,
    updateClub,
    getClubContests,
    createClubContest,
};
