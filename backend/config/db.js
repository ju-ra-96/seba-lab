var Pool = require('pg-pool')

const pool = new Pool({
user: "gosdurtygktirn",
host: "ec2-54-229-68-88.eu-west-1.compute.amazonaws.com",
password: "ec3fe04043d41a2fc90ed6f6ee98c8b4f7399f1a685af5724bb418e8772b3a6a",
port: 5432,
database: "d8v06dbndnu9f0"
}) 

module.exports = pool;