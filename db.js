// creating mongodb collections
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;

module.exports = {
    getPrevCount: async function (){
        let client = await MongoClient.connect(url, { useNewUrlParser: true });
        return client.db().collection("viewCollection").findOne({'name': 'handsomeYuanCount'});
    },
    
    updateCount: async function(){
        let client = await MongoClient.connect(url, { useNewUrlParser: true });
        client.db().collection("viewCollection").updateOne({'name': 'handsomeYuanCount'},{ $inc: {'viewCount': 1 }}, {upsert: true});
    }
    
};





