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
                storeId: {$regex : new RegExp(filter.storeId, "i") },
                orderId: {$regex : new RegExp(filter.orderId, "i") }
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
                storeId: {$regex : new RegExp(filter.storeId, "i") },
                orderType: {$regex : new RegExp(filter.orderType, "i") },
                orderStatus: {$regex : new RegExp("undelivered", "i") },
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

//get All Stores
Order.prototype.getAllOrders = function () {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({},{_id:0,orderId:1})
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
        return new Order();
    }
}