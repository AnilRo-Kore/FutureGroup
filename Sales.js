var collectionName = "Sales";
var dbManager = require("./DBManager.js");
var Promise = require("bluebird");

function Sales() {
}


//get inventory details for product
Sales.prototype.getSalesInfo = function (filter) {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({
                storeId: filter.storeId,
                saleDate: new Date(filter.saleDate)
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

//get inventory details for product
Sales.prototype.getSalesInfoWithinDateRange = function (filter) {
     return new Promise(function(resolve, reject){
         dbManager.getConnection(function (db) {
             db.collection(collectionName).find({
                 storeId: filter.storeId,
                 saleDate: { $gte: new Date(filter.fromSaleDate), $lte: new Date(filter.toSaleDate)}
             })
             .toArray(function(err, res){
                 console.log(err, res);
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
        return new Sales();
    }
}