const pg = require('pg');

const Pool = pg.Pool;

const config = {
    database: 'playfair-songs', // ONLY LINE YOU NEED TO CHANGE TO REUSE
    host: 'localhost',
    port: 5432,
    max: 10, // max simultaneous queries
    idleTimeOutMillis: 30000 // 30 second timeout
}

const pool = new Pool(config);


// Pool event listeners
pool.on('connect', () => {
    console.log('Database connected')
})

pool.on('error', (error) => {
    console.log('Database error:', error);
})

module.exports = pool;