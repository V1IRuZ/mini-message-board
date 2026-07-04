const { Pool } = require("pg");

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT } = process.env;

module.exports = new Pool({
  host: PGHOST,
  user: PGUSER,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
});
