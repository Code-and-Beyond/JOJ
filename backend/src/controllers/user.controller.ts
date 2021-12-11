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
    const user = await Query(client, 'SELECT * FROM "users" WHERE "uid" = $1', [
      uid,
    ]);
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
    const client = await Connect();
    const user = await Query(
      client,
      'INSERT INTO "users" ("uid", "username", "fullname", "image", "logins", "lastLogin") VALUES ($1, $2, $3, $4, $5, $6)',
      [
        userObj.uid,
        userObj.username,
        userObj.fullname,
        userObj.image,
        userObj.logins,
        userObj.lastLogin,
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid } = req.params;
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
    const course = await Query(
      client,
      'SELECT * FROM "evalReports" WHERE "uid" = $1',
      [uid]
    );
    res.status(200).json({
      course: course.rows,
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
};
