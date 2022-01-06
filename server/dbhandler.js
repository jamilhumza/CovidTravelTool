const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASS,
  host: 'postgres',
  port: 5432,
  database: process.env.DATABASE,
})

module.exports = pool
