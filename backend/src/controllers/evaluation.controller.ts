import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

import { v4 as uuidv4 } from 'uuid';

// get evals of a course
const getEvaluationsOfCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;
    const client = await Connect();
    const course = await Query(
      client,
      'SELECT * FROM "evals" WHERE "courseId" = $1',
      [courseId]
    );
    res.status(200).json({
      course: course.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// create an eval
const createEvaluation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const evalObj = {
      ...req.body,
      courseId: req.params.courseId,
      evalId: uuidv4(),
    };
    const client = await Connect();
    const evaluation = await Query(
      client,
      'INSERT INTO "evals" ("evalId", "courseId", "name", "startTime", "endTime", "description", "totalMarks") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        evalObj.evalId,
        evalObj.courseId,
        evalObj.name,
        evalObj.startTime,
        evalObj.endTime,
        evalObj.description,
        evalObj.totalMarks,
      ]
    );
    res.status(201).json({
      eval: evaluation.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// update an eval
const updateEvaluation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const computeUpdateQuery = () => {
      let queryString = 'UPDATE "evals" SET ';
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
      queryString += ` WHERE "evalId" = '${req.params.evalId}'`;

      return { queryString, queryArray };
    };

    const args = computeUpdateQuery();
    const client = await Connect();
    const course = await Query(client, args.queryString, args.queryArray);
    res.status(200).json({
      course: course.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

export default { getEvaluationsOfCourse, createEvaluation, updateEvaluation };
