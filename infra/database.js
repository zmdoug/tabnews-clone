import { Client } from "pg";

async function query(queryObject) {
  const client = await getNewClient();

  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error, "Database query error");
    throw error;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  try {
    const client = new Client({
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      ssl: getSSLValues(),
    });

    await client.connect();
    return client;
  } catch (error) {
    console.error(error, "Database Connection Error");
    throw error;
  }
}

export default {
  query,
  getNewClient,
};

function getSSLValues() {
  return process.env.NODE_ENV === "production" ? true : false;
}
