import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import { HttpException } from '../middleware/errorHandler';
import { Connect, Query } from '../config/postgres';

import auth from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
  let { username, token } = req.body;
  let url =
    'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + token;

  try {
    const response = await axios.get(url);
    if (response.data.email !== username || !response.data.verified_email)
      throw new HttpException(401, 'Invalid details');

    const client = await Connect();

    const googleData = response.data;
    const result = await Query(
      client,
      'SELECT * FROM "users" WHERE "username" = $1',
      [googleData.email]
    );
    if (result.rows.length < 1) {
      // first time login
      const uid = uuidv4();
      await Query(
        client,
        'INSERT INTO users (uid, username, fname, lname, fullname, image, logins, lastlog) VALUES ($1, $2, $3, $4, $5, $6, 0, CURRENT_TIMESTAMP)',
        [
          uid,
          googleData.email,
          googleData.given_name,
          googleData.family_name,
          googleData.name,
          googleData.picture,
        ]
      );
    } else {
      await Query(
        client,
        'UPDATE users SET logins = logins + 1, lastlog = CURRENT_TIMESTAMP WHERE username = $1',
        [googleData.email]
      );
    }

    const user = await Query(
      client,
      'SELECT * FROM "users" WHERE "username" = $1',
      [username]
    );
    const accessToken = auth.generateAccessToken({
      username: googleData.email,
    });
    res.json({
      error: false,
      message: 'User Logged In',
      data: user.rows[0],
      tokens: {
        accessToken: accessToken,
      },
    });

    client.end();
  } catch (error: any) {
    next(new HttpException(404, error.message));
  }
};

export default { googleAuth };
