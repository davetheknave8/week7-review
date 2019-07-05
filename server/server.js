const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool');

//Set up app
const app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//GET & POST Routes








//Set up port
const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})