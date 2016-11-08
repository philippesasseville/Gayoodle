var MongoClient = require('mongodb').MongoClient

var url = "mongodb://log4420:log4420@ds137197.mlab.com:37197/log4420-2016"
var db = null;

module.exports.get = callback => {
    if (db){
        callback(maBD)
    } else {
        MongoClient.connect(url, function(err, database) {
            if (err) {
                console.log("Connexion avec la BD a échoué");
            } else {
                console.log("Connexion avec la BD avec succès");
                db = database;
                callback(db);
            }
        });
    }
}

