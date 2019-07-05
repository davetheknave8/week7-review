const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool');

//Set up app
const app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//GET & POST Routes
app.get('/item', (req, res) =>{
    const sqlText = `SELECT * FROM "items" ORDER BY "id"`
    pool.query(sqlText)
        .then(function(response){
            res.send(response.rows);
        })
        .catch(function(error){
            console.log(error);
            res.sendStatus(500);
        })
})

app.post('/item', (req, res) => {
    const item = req.body;
    const sqlText = `INSERT INTO "items"("size", "color", "item")
                        VALUES($1, $2, $3)`
    const values = [item.size, item.color, item.item];
    pool.query(sqlText, values)
        .then(function(response){
            res.sendStatus(200);
        })
        .catch(function(error){
            res.sendStatus(500);
        })
})

app.put('/item/:id', (req, res) => {
    const idToEdit = req.params.id;
    const item = req.body;
    const sqlText = `UPDATE "items" SET "size"=$1, "color"=$2, "item"=$3 WHERE "id"=$4;`;
    const values = [item.size, item.color, item.item, idToEdit];
    pool.query(sqlText, values)
        .then(function(response){
            res.sendStatus(200);
        })
        .catch(function(error){
            res.sendStatus(500);
        })
})

app.delete('/item/:id', (req, res) =>{
    let idToDelete = req.params.id;
    const sqlText = `DELETE FROM "items" WHERE "id"=$1;`;
    const values = [idToDelete];
    pool.query(sqlText, values)
        .then(function(response){
            res.sendStatus(200);
        })
        .catch(function(error){
            res.sendStatus(500);
        })
})



//Set up port
const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})