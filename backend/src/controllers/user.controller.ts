import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

import { v4 as uuidv4 } from 'uuid';

// get all users
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = await Connect();
        const users = await Query(client, 'SELECT * FROM "users"');
        res.status(200).json({
            users: users.rows,
            count: users.rows.length,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(404, error.message));
    }
};

// get a user by uid
const getUserByUid = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const uid = req.params.uid;
        const client = await Connect();
        const user = await Query(
            client,
            'SELECT * FROM "users" WHERE "uid" = $1',
            [uid]
        );
        res.status(200).json({
            user: user.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(404, error.message));
    }
};

// push a user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userObj = {
            ...req.body,
            uid: uuidv4(),
        };
        console.log({ userObj });
        const client = await Connect();
        const user = await Query(
            client,
            'INSERT INTO "users" ("uid", "username", "fullname", "image", "logins", "lastLogin", "role") VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [
                userObj.uid,
                userObj.username,
                userObj.fullname,
                userObj.image,
                userObj.logins,
                userObj.lastLogin,
                userObj.role,
            ]
        );
        res.status(201).json({
            user: user.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(404, error.message));
    }
};

// update a user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const computeUpdateQuery = () => {
            let queryString = 'UPDATE "users" SET ';
            let queryArray: any = [];

            const updateColumns = (colArray: string[]) => {
                for (let colName of colArray) {
                    if (req.body[colName] === undefined) continue;

                    queryString += `"${colName}" = $${queryArray.length + 1}, `;
                    queryArray.push(req.body[colName]);
                }
            };

            updateColumns(['fullname', 'image', 'logins', 'lastLogin']);

            queryString = queryString.substring(0, queryString.length - 2);
            queryString += ` WHERE "uid" = '${req.params.uid}'`;

            return { queryString, queryArray };
        };

        const args = computeUpdateQuery();
        const client = await Connect();
        const user = await Query(client, args.queryString, args.queryArray);
        res.status(200).json({
            user: user.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(404, error.message));
    }
};

// get user courses
const getUserCourses = async (
    req: Request | any,
    res: Response,
    next: NextFunction
) => {
    try {
        const { uid } = req.params;
        // const uid = req.user.uid;
        const client = await Connect();
        const courses = await Query(
            client,
            'SELECT * FROM "courses" INNER JOIN "courseMembers" ON "courseMembers"."uid" = $1 AND "courseMembers"."courseId" = "courses"."courseId";',
            [uid]
        );
        res.status(200).json({
            courses: courses.rows,
            count: courses.rows.length,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(404, error.message));
    }
};

// get user reports
const getUserReports = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { uid } = req.params;
        const client = await Connect();
        const reports = await Query(
            client,
            'SELECT * FROM "reports" WHERE "uid" = $1',
            [uid]
        );
        res.status(200).json({
            reports: reports.rows,
            count: reports.rows.length,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(404, error.message));
    }
};

// get user submissions
const getUserSubmissions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { uid } = req.params;
        const client = await Connect();
        const submissions = await Query(
            client,
            'SELECT * FROM "submissions" WHERE "uid" = $1',
            [uid]
        );
        res.status(200).json({
            submissions: submissions.rows,
            count: submissions.rows.length,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(404, error.message));
    }
};

// get user contest submissions
const getUserContestSubmissions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { uid, contestId } = req.params;
        const client = await Connect();
        const submissions = await Query(
            client,
            'SELECT "submissions".* FROM "submissions" INNER JOIN "problems" ON "submissions"."uid" = $1 AND "problems"."contestId" = $2 AND "submissions"."problemId" = "problems"."problemId"',
            [uid, contestId]
        );
        res.status(200).json({
            submissions: submissions.rows,
            count: submissions.rows.length,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(404, error.message));
    }
};

// get user evaluation submissions
const getUserEvaluationSubmissions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { uid, evaluationId } = req.params;
        const client = await Connect();
        const submissions = await Query(
            client,
            'SELECT "submissions".* FROM "submissions" INNER JOIN "problems" ON "submissions"."uid" = $1 AND "problems"."contestId" = $2 AND "submissions"."problemId" = "problems"."problemId"',
            [uid, evaluationId]
        );
        res.status(200).json({
            submissions: submissions.rows,
            count: submissions.rows.length,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(404, error.message));
    }
};

// get user problem submissions
const getUserProblemSubmissions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { uid, problemId } = req.params;
        const client = await Connect();
        const submissions = await Query(
            client,
            'SELECT * FROM "submissions" WHERE "problemId" = $1 AND "uid" = $2',
            [problemId, uid]
        );
        res.status(200).json({
            submissions: submissions.rows,
            count: submissions.rows.length,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(404, error.message));
    }
};

// create user problem submission
const createUserProblemSubmission = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const submissionObj = {
            ...req.body,
            submissionId: uuidv4(),
            uid: req.params.uid,
            problemId: req.params.problemId,
            creationTime: new Date(),
        };
        const client = await Connect();
        const submission = await Query(
            client,
            'INSERT INTO "submissions" ("submissionId", "problemId", "uid", "creationTime", "sourceCode", "language", "verdict", "testcasesPassed") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [
                submissionObj.submissionId,
                submissionObj.problemId,
                submissionObj.uid,
                submissionObj.creationTime,
                submissionObj.sourceCode,
                submissionObj.language,
                submissionObj.verdict,
                submissionObj.testcasesPassed,
            ]
        );
        res.status(201).json({
            submission: submission.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(404, error.message));
    }
};

export default {
    getAllUsers,
    getUserByUid,
    createUser,
    updateUser,
    getUserCourses,
    getUserReports,
    getUserSubmissions,
    getUserContestSubmissions,
    getUserEvaluationSubmissions,
    getUserProblemSubmissions,
    createUserProblemSubmission,
};
