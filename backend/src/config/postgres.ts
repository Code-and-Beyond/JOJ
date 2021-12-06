import { Client, QueryResult } from 'pg';
import config from './config';

const params = {
  connectionString: config.postgres.connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
};

const Connect = async () =>
  new Promise<Client>(async (resolve, reject) => {
    try {
      const client = new Client(params);
      await client.connect();
      resolve(client);
    } catch (error) {
      reject(error);
    }
  });

const Query = async (
  connection: Client,
  queryString: string,
  queryValues?: Array<any>
) =>
  new Promise<QueryResult>((resolve, reject) => {
    try {
      const res = connection.query(queryString, queryValues);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

export { Connect, Query };
