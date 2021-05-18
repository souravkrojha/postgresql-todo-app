//for production
// const { Client } = require('pg');
//for development
const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

const pool = new Pool({ devConfig });
//for production

// const pool = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// pool.connect();
module.exports = pool;
