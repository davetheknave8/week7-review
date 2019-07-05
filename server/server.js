const express = require('express');
const app = express();
const bodyParser = require('body-parser')

//Set up app
const app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}))










//Set up port
const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})