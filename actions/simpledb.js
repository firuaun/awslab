var AWS_CONFIG_FILE = "config.json";
var SIMPLEDB_TEMPLATE = "simpledb.ejs";

var AWS = require("aws-sdk");
AWS.config.loadFromPath(AWS_CONFIG_FILE);


var task = function(request, callback){
    var simpleDB = new AWS.SimpleDB();
    simpleDB.listDomains({},function(err,domains){
        if(err) console.log(err);
        callback(null, {template: SIMPLEDB_TEMPLATE, params:{domains:domains.DomainNames}});   
    });
};

exports.action = task;