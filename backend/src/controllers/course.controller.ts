import { NextFunction, Request, Response } from 'express';
import { createCourse } from '../services/course.service';

import { HttpException } from '../middleware/errorHandler';

const addCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newBus = await createBus(req.body);

        res.status(201).json({
            busDetails: newBus
        });

    } catch (err: any) {
        next(new HttpException(400, err.message));
    }
};


export default { addCourse };