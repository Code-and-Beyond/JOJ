import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

import { v4 as uuidv4 } from 'uuid';

// update a problem
const updateProblem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const computeUpdateQuery = () => {
      let queryString = 'UPDATE "problems" SET ';
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
        'statement',
        'input',
        'output',
        'constraints',
        'timeLimit',
        'memoryLimit',
        'explanation',
      ]);

      queryString = queryString.substring(0, queryString.length - 2);
      queryString += ` WHERE "problemId" = '${req.params.problemId}'`;

      return { queryString, queryArray };
    };

    const args = computeUpdateQuery();
    const client = await Connect();
    const problem = await Query(client, args.queryString, args.queryArray);
    res.status(200).json({
      problem: problem.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// get problem testcases
const getProblemTestcases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { problemId } = req.params;
    const client = await Connect();
    const testcases = await Query(
      client,
      'SELECT * FROM "testcases" WHERE "problemId" = $1',
      [problemId]
    );
    res.status(200).json({
      testcases: testcases.rows,
      count: testcases.rows.length,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// create problem testcase
const createProblemTestcase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const testcaseObj = {
      ...req.body,
      testcaseId: uuidv4(),
      problemId: req.params.problemId,
    };
    const client = await Connect();
    const testcase = await Query(
      client,
      'INSERT INTO "testcases" ("testcaseId", "problemId", "stdin", "expectedOutput", "isSample") VALUES ($1, $2, $3, $4, $5)',
      [
        testcaseObj.testcaseId,
        testcaseObj.problemId,
        testcaseObj.stdin,
        testcaseObj.expectedOutput,
        testcaseObj.isSample,
      ]
    );
    res.status(201).json({
      testcase: testcase.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// get problem submissions
const getProblemSubmissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { problemId } = req.params;
    const client = await Connect();
    const submissions = await Query(
      client,
      'SELECT * FROM "submissions" WHERE "problemId" = $1',
      [problemId]
    );
    res.status(200).json({
      submissions: submissions.rows,
      count: submissions.rows.length,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

export default {
  updateProblem,
  getProblemTestcases,
  createProblemTestcase,
  getProblemSubmissions,
};
