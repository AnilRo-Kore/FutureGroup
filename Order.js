var collectionName = "Order";
var dbManager = require("./DBManager.js");
var Promise = require("bluebird");

function Order() {
}


//get order details for product
Order.prototype.getDetailsForOrder = function (filter) {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({
                storeId: filter.storeId,
                orderId: filter.orderId,
                cutomerId: filter.cutomerId
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

//get order details for product
Order.prototype.getAlertFororders = function (filter) {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({
                storeId: filter.storeId,
                orderType: filter.orderType,
                orderStatus: "undelivered",
                deliveryDate: { $lte: filter.currentDateTime}
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
        return new Order();
    }
}