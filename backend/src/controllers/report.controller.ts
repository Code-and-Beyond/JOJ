import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

// get report of an eval
const getReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { evalId } = req.params;
    const client = await Connect();
    const course = await Query(
      client,
      'SELECT * FROM "reports" WHERE "evalId" = $1',
      [evalId]
    );
    res.status(200).json({
      course: course.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// create eval report entry
const createReportEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const evalReportObj = {
      ...req.body,
      evalId: req.params.evalId,
      uid: req.params.uid,
    };
    const client = await Connect();
    const evalReport = await Query(
      client,
      'INSERT INTO "reports" ("evalId", "uid", "score", "plagPercentage", "marks", "comments") VALUES ($1, $2, $3, $4, $5, $6)',
      [
        evalReportObj.evalId,
        evalReportObj.uid,
        evalReportObj.score,
        evalReportObj.plagPercentage,
        evalReportObj.marks,
        evalReportObj.comments,
      ]
    );
    res.status(201).json({
      evalReport: evalReportObj.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// update eval report entry
const updateReportEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const computeUpdateQuery = () => {
      let queryString = 'UPDATE "reports" SET ';
      let queryArray: any = [];

      const updateColumns = (colArray: string[]) => {
        for (let colName of colArray) {
          if (req.body[colName] === undefined) continue;

          queryString += `"${colName}" = $${queryArray.length + 1}, `;
          queryArray.push(req.body[colName]);
        }
      };

      updateColumns(['score', 'plagPercentage', 'marks', 'comments']);

      queryString = queryString.substring(0, queryString.length - 2);
      queryString += ` WHERE "evalId" = '${req.params.evalId}' AND "uid" = '${req.params.uid}'`;

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
  getReport,
  createReportEntry,
  updateReportEntry,
};
