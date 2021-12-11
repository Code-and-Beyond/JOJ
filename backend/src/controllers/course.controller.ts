import { NextFunction, Request, Response } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

import { v4 as uuidv4 } from 'uuid';

// get all courses
const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = await Connect();
    const courses = await Query(client, 'SELECT * FROM "courses"');
    res.status(200).json({
      courses: courses.rows,
      count: courses.rows.length,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// get course by course id
const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;
    const client = await Connect();
    const course = await Query(
      client,
      'SELECT * FROM "courses" WHERE "courseId" = $1',
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

// get course by invite code
const getCourseByInviteCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.params;
    const client = await Connect();
    const course = await Query(
      client,
      'SELECT * FROM "courses" WHERE "inviteCode" = $1',
      [code]
    );
    res.status(200).json({
      course: course.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// create a course
const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseObj = {
      ...req.body,
      courseId: uuidv4(),
      creationTime: new Date(),
      inviteCode: uuidv4(),
    };
    const client = await Connect();
    const course = await Query(
      client,
      'INSERT INTO "courses" ("courseId", "name", "creationTime", "inviteCode", "subjectCode", "degree", "branch", "batch", "year") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        courseObj.courseId,
        courseObj.name,
        courseObj.creationTime,
        courseObj.inviteCode,
        courseObj.subjectCode,
        courseObj.degree,
        courseObj.branch,
        courseObj.batch,
        courseObj.year,
      ]
    );
    res.status(201).json({
      course: course.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// update a course
const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const computeUpdateQuery = () => {
      let queryString = 'UPDATE "courses" SET ';
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
        'inviteCode',
        'subjectCode',
        'degree',
        'branch',
        'batch',
        'year',
      ]);

      queryString = queryString.substring(0, queryString.length - 2);
      queryString += ` WHERE "courseId" = '${req.params.courseId}'`;

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

// get course evaluations
const getCourseEvaluations = async (
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

// create course evaluation
const createCourseEvaluation = async (
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

export default {
  getAllCourses,
  getCourseById,
  getCourseByInviteCode,
  createCourse,
  updateCourse,
  getCourseEvaluations,
  createCourseEvaluation,
};
