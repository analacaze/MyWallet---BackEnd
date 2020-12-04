require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
});

module.exports = db;