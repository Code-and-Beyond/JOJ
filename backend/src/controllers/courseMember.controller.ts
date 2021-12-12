import { NextFunction, Request, Response } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

// get all members of a course
const getCourseMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;
    const client = await Connect();
    const courseMembers = await Query(
      client,
      'SELECT "users"."uid", "users"."username", "users"."fullname", "users"."image", "courseMembers"."role" FROM "users" INNER JOIN "courseMembers" ON "courseMembers"."courseId" = $1 AND "users"."uid" = "courseMembers"."uid";',
      [courseId]
    );
    res.status(200).json({
      courseMembers: courseMembers.rows,
      count: courseMembers.rows.length,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// push a member to a course
const pushCourseMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId, uid } = req.params;
    const { role } = req.body;
    const client = await Connect();
    const courseMember = await Query(
      client,
      'INSERT INTO "courseMembers" ("courseId", "uid", "role") VALUES ($1, $2, $3)',
      [courseId, uid, role]
    );
    res.status(200).json({
      courseMember: courseMember.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// update a member of a course
const updateCourseMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const computeUpdateQuery = () => {
      let queryString = 'UPDATE "courseMembers" SET ';
      let queryArray: any = [];

      const updateColumns = (colArray: string[]) => {
        for (let colName of colArray) {
          if (req.body[colName] === undefined) continue;

          queryString += `"${colName}" = $${queryArray.length + 1}, `;
          queryArray.push(req.body[colName]);
        }
      };

      updateColumns(['role']);

      queryString = queryString.substring(0, queryString.length - 2);
      queryString += ` WHERE "courseId" = '${req.params.courseId}' AND "uid" = '${req.params.uid}'`;

      return { queryString, queryArray };
    };

    const args = computeUpdateQuery();
    const client = await Connect();
    const courseMember = await Query(client, args.queryString, args.queryArray);
    res.status(200).json({
      courseMember: courseMember.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// delete a member from a course
const deleteCourseMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId, uid } = req.params;
    const client = await Connect();
    const courseMember = await Query(
      client,
      'DELETE FROM "courseMembers" WHERE "courseId" = $1 AND "uid" = $2',
      [courseId, uid]
    );
    res.status(200).json({
      courseMember: courseMember.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

export default {
  getCourseMembers,
  pushCourseMember,
  updateCourseMember,
  deleteCourseMember,
};
