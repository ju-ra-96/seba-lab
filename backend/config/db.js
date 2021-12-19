var Pool = require('pg-pool')

const pool = new Pool({
user: "admin",
host: "localhost",
password: "admin",
port: 5432,
database: "seba"
}) 

module.exports = pool;