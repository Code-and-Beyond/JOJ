import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

import { v4 as uuidv4 } from 'uuid';

// get problems of a contest
const getContestProblems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { contestId } = req.params;
    const client = await Connect();
    const problems = await Query(
      client,
      'SELECT * FROM "problems" WHERE "contestId" = $1',
      [contestId]
    );
    res.status(200).json({
      course: problems.rows,
      count: problems.rows.length,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

// create a problem
const createContestProblem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const problemObj = {
      ...req.body,
      problemId: uuidv4(),
      contestId: req.params.contestId,
    };
    const client = await Connect();
    const problem = await Query(
      client,
      'INSERT INTO "problems" ("problemId", "contestId", "name", "statement", "input", "output", "constraints", "timeLimit", "memoryLimit", "sampleInput", "sampleOutput", "explanation") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
      [
        problemObj.problemId,
        problemObj.contestId,
        problemObj.name,
        problemObj.statement,
        problemObj.input,
        problemObj.output,
        problemObj.constraints,
        problemObj.timeLimit,
        problemObj.memoryLimit,
        problemObj.sampleInput,
        problemObj.sampleOutput,
        problemObj.explanation,
      ]
    );
    res.status(201).json({
      problem: problem.rows,
    });
    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

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
        'sampleInput',
        'sampleOutput',
        'explanation',
      ]);

      queryString = queryString.substring(0, queryString.length - 2);
      queryString += ` WHERE "problemId" = '${req.params.problemId}'`;

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

export default { getContestProblems, createContestProblem, updateProblem };
