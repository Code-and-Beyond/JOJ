import { NextFunction, Request, Response } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

// get club admins
const getClubAdmins = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { clubId } = req.params;
        const client = await Connect();
        const clubAdmins = await Query(
            client,
            'SELECT "users"."uid", "users"."username", "users"."fullname", "users"."image" FROM "users" INNER JOIN "clubAdmins" ON "clubAdmins"."clubId" = $1 AND "users"."uid" = "clubAdmins"."uid";',
            [clubId]
        );
        res.status(200).json({
            clubAdmins: clubAdmins.rows,
            count: clubAdmins.rows.length,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// push an admin to a club
const pushClubAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { clubId, uid } = req.params;
        const client = await Connect();
        const clubAdmin = await Query(
            client,
            'INSERT INTO "clubAdmins" ("clubId", "uid") VALUES ($1, $2)',
            [clubId, uid]
        );
        res.status(200).json({
            clubAdmin: clubAdmin.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

// delete an admin from a club
const deleteClubAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { clubId, uid } = req.params;
        const client = await Connect();
        const clubAdmin = await Query(
            client,
            'DELETE FROM "clubAdmins" WHERE "clubId" = $1 AND "uid" = $2',
            [clubId, uid]
        );
        res.status(200).json({
            clubAdmin: clubAdmin.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

export default {
    getClubAdmins,
    pushClubAdmin,
    deleteClubAdmin,
};
