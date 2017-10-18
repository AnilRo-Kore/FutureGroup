var collectionName = "Incident";
var dbManager = require("./DBManager.js");
var Promise = require("bluebird");

function Incident() {
}


//get incident details for the customer
Incident.prototype.getIncidentDetailsForCustomer = function (filter) {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({
                storeId: {$regex : new RegExp(filter.storeId, "i") },
                incidentId: {$regex : new RegExp(filter.incidentId, "i") }
            })
            .toArray(function(err, res){
                if(err){
                    return reject(err);
                }
                return resolve (res);
            });
        });
    });
}

//get All Incidents
Incident.prototype.getAllIncidents = function (filter) {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({storeId: {$regex : new RegExp(filter.storeId, "i") }})
            .toArray(function(err, res){
                if(err){
                    return reject(err);
                }
                return resolve(res);
            });
        });
    });
}
module.exports = {
    getInst: function () {
        return new Incident();
    }
}