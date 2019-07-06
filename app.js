// use express method
var express = require('express');
var path = require('path');
var app = express();

// create ejs
var engine = require('ejs-locals');
app.engine('ejs',engine);
app.set('files','./files');
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

var dir = path.join(__dirname, 'public');
app.use(express.static(dir));



// check running enviroment
var port = process.env.PORT || 3000;

var db = require('./db');
/*
db.getPrevCount().then(function(items) {
                     console.info('The promise was fulfilled with items!', items);
                     }, function(err) {
                     console.error('The promise was rejected', err, err.stack);
});*/
async function getPrevCount(){
    console.log('getting prev count...');
    const prevCount = await db.getPrevCount();
    console.log('got prev count' + ',' + prevCount.viewCount);
    return { 'views':  prevCount.viewCount};
}


app.get('/', async function(req, res){
        console.log('json sent');
        res.render('index.html');
});   


// create
app.listen(port);
if(port === 3000){
    console.log('RUN http://localhost:3000/')
}

app.get('/getViews', async function(req,res) {
           // make some calls to database, fetch some data, information, check state, etc...
           const dataToSendToClient = await getPrevCount();
           // convert whatever we want to send (preferably should be an object) to JSON
           var JSONdata = JSON.stringify(dataToSendToClient);
           res.send(JSONdata);
});

app.get('/updateViews', function(req,res) {
        // make some calls to database, fetch some data, information, check state, etc...
        db.updateCount();
        });

// insert once
/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("mydb");
                    var myobj = {name: 'handsomeYuanCount', viewCount: 0};
                    dbo.collection("viewCollection").insertOne(myobj, function(err, res) {
                                                               if (err) throw err;
                                                               console.log("1 document inserted");
                                                               db.close();
                                                               });
                    });

*/
