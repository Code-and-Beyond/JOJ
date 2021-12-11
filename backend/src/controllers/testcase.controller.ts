import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

// update a testcase
const updateTestcase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const computeUpdateQuery = () => {
      let queryString = 'UPDATE "testcases" SET ';
      let queryArray: any = [];

      const updateColumns = (colArray: string[]) => {
        for (let colName of colArray) {
          if (req.body[colName] === undefined) continue;

          queryString += `"${colName}" = $${queryArray.length + 1}, `;
          queryArray.push(req.body[colName]);
        }
      };

      updateColumns(['stdin', 'expectedOutput', 'isSample']);

      queryString = queryString.substring(0, queryString.length - 2);
      queryString += ` WHERE "testcaseId" = '${req.params.testcaseId}'`;

      return { queryString, queryArray };
    };

    const args = computeUpdateQuery();
    const client = await Connect();
    const testcase = await Query(client, args.queryString, args.queryArray);
    res.status(200).json({
      testcase: testcase.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// delete a testcase
const deleteTestcase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { testcaseId } = req.params;
    const client = await Connect();
    const testcase = await Query(
      client,
      'DELETE FROM "testcases" WHERE "testcaseId" = $1',
      [testcaseId]
    );
    res.status(200).json({
      testcase: testcase.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

export default { updateTestcase, deleteTestcase };
