import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

// get a submission by submission id
const getSubmissionById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { submissionId } = req.params;
        const client = await Connect();
        const submission = await Query(
            client,
            'SELECT * FROM "submissions" WHERE "submissionId" = $1',
            [submissionId]
        );
        res.status(200).json({
            submission: submission.rows,
        });
        client.end();
    } catch (error: any) {
        next(new HttpException(500, error.message));
    }
};

export default { getSubmissionById };
