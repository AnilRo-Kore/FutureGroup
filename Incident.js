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
                storeId: filter.storeId,
                cutomerId: filter.cutomerId,
                incidentId: filter.incidentId
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

module.exports = {
    getInst: function () {
        return new Incident();
    }
}