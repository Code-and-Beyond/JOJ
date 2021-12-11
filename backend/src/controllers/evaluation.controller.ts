import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

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

export default {
  updateEvaluation,
};
