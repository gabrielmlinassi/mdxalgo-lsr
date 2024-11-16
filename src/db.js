const pg = require("pg");
const { Pool } = pg;

const { connectionString } = require("./consts");

const connectDb = async () => {
  if (global.connection) {
    return global.connection.connect();
  }

  const pool = new Pool({ connectionString });

  const client = await pool.connect();

  client.release();

  global.connection = pool;
  return pool.connect();
};

const fetchLongShortRates = async (limit = 0) => {
  try {
    const db = await connectDb();
    const query = `SELECT longrate, shortrate, time from longshortratio order by time desc;`;
    const res = await db.query(query);
    return res.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertLongShortRate = async (longrate = 0.0, shortRate = 0.0) => {
  try {
    const db = await connectDb();
    const query = `INSERT INTO longshortratio (longrate, shortrate) VALUES (${longrate}, ${shortRate});`;
    const res = await db.query(query);
    return res.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  connectDb,
  fetchLongShortRates,
  insertLongShortRate,
};
