const pg = require('pg');

const Pool = pg.Pool;

//Both local Heroku database config
let config = {}


if (process.env.DATABASE_URL){
    //Heroku config
    const url = require('url');
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    config = {
        // Heroku puts security on our database
        user: auth[0],
        password: auth[1],
        // Need to get remote server & port
        host: params.hostname,
        port: params.port,
        // Get the database name by splitting the pathname
        // and taking 2nd part (array item 1)
        database: params.pathname.split('/')[1],
        //last two items don't change
        max: 12,
        idleTimeOutMillis: 30000
    }
} else{
    config = {
        database: 'items', // ONLY LINE YOU NEED TO CHANGE TO REUSE
        host: 'localhost',
        port: 5432,
        max: 10, // max simultaneous queries
        idleTimeOutMillis: 30000 // 30 second timeout
    }  
} //end config

const pool = new Pool(config);


// Pool event listeners
pool.on('connect', () => {
    console.log('Database connected')
})

pool.on('error', (error) => {
    console.log('Database error:', error);
})

module.exports = pool;