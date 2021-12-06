import { Request, Response, NextFunction } from 'express';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

// get all users
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await Connect();
    const users = await Query(client, 'SELECT * FROM users');
    res.status(200).json({
      users: users.rows,
      count: users.rows.length,
    });
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

export default { getAllUsers };
