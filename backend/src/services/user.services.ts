import { Connect, Query } from '../config/postgres';

export const getUserByUsername = async (username: string) => {
  const client = await Connect();
  const user = await Query(
    client,
    'SELECT * FROM "users" WHERE "username" = $1',
    [username]
  );
  client.end();
  return { user };
};
