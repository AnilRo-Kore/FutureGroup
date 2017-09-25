var collectionName = "Sales";
var dbManager = require("./DBManager.js");
var Promise = require("bluebird");

function Sales() {
}


//get inventory details for product
Sales.prototype.getSalesInfo = function (filter) {
   // console.log("@@@@@@@@@@@@@@@@@ filter.storeId : " + filter.storeId + " filter.saleDate "+ filter.saleDate);
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({
                storeId: filter.storeId,
                saleDate: filter.saleDate
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
    // console.log("@@@@@@@@@@@@@@@@@ filter.storeId : " + filter.storeId + " filter.saleDate "+ filter.saleDate);
     return new Promise(function(resolve, reject){
         dbManager.getConnection(function (db) {
             console.log("AAAAAAAA" + filter.fromSaleDate + " " + filter.toSaleDate) ;
             db.collection(collectionName).find({
                 storeId: filter.storeId,
                 //fromSaleDate: filter.fromSaleDate,
                 //toSaleDate: filter.toSaleDate,

                 saleDate: { $gt :  filter.fromSaleDate, $lt : filter.toSaleDate}

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
        return new Sales();
    }
}