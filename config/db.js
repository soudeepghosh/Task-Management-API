const {Pool} = require('pg');

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_MAX_POOL_SIZE} = process.env;

const pool = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    max: DB_MAX_POOL_SIZE
});

// IIFE
(async () => {
    try {
      const client = await pool.connect();
      console.log('Database connected successfully...');
      client.release();  // Release connection
    } catch (err) {
      console.error('Database connection failed', err);
      process.exit(1);  // Exit if connection fails
    }
})();

module.exports = {
    query: (text, params) => pool.query(text, params)
};