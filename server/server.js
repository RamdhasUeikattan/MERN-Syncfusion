var MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var url = "mongodb://localhost:27017/";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(5000, function () {
    console.log('listening on 5000')
})
app.use(express.static(__dirname))

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.post("/customers", (req, res) => {
        console.log(req.body);
        dbo.collection('customer1').count({}, ((err, result) => {
            dbo.collection('customer1').find({}).skip(+req.body.skip).limit(+req.body.take).toArray((err, cus) => {
             res.send({ result: cus, count: result});
            }); 
        }));
    });
});


