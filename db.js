const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};
const proConfig = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool({
  connectionString:
    'postgres://ycspvgjnflzaax:de6e3a85386a8a1846ebb89c20707fdf4942fbca69d4d99e76b94dcc4b3a2e63@ec2-3-217-219-146.compute-1.amazonaws.com:5432/d4tdhm3qbk1i4j',
});

module.exports = pool;
