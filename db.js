// creating mongodb database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = {
    getPrevCount: async function (){
        let client = await MongoClient.connect(url, { useNewUrlParser: true });
        return client.db("mydb").collection("viewCollection").findOne({'name': 'handsomeYuanCount'});
    },
    
    updateCount: async function(){
        let client = await MongoClient.connect(url, { useNewUrlParser: true });
        client.db("mydb").collection("viewCollection").update({'name': 'handsomeYuanCount'},{ $inc: {'viewCount': 1 }});
    }
    
};

// initialize





