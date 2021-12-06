import { NextFunction, Request, Response } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/mysql';


const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    let { batch, name, code } = req.body;

    let query = `INSERT INTO courses (batch,name,code) VALUES ("${batch}", "${name}","${code}")`;
    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {

    let query = 'SELECT * FROM courses';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            return res.status(200).json({
                message: error.message,
                error
            });
        });
};


export default { createCourse, getAllCourses };