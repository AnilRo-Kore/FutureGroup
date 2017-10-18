var collectionName = "Product";
var dbManager = require("./DBManager.js");
var Promise = require("bluebird");

function Product() {
}


//get inventory details for product
Product.prototype.getInventoryForProduct = function (filter) {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({
                storeId: {$regex : new RegExp(filter.storeId, "i") },
                productName: {$regex : new RegExp(filter.productName, "i") }
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
Product.prototype.getProductsInStore = function (filter) {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({
                storeId: {$regex : new RegExp(filter.storeId, "i") }
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

//get inventory/product details for product
Product.prototype.getInventoryStockDetails = function (filter) {
    return new Promise(function(resolve, reject){
        // console.log("filter.quantity : "+ filter.quantity);
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({
                quantity: filter.quantity,
                storeId:  {$regex : new RegExp(filter.storeId, "i") }
            })
            .toArray(function(err, res){
                if(err){
                    return reject(err);
                }
              //  console.log("@@@" + JSON.stringify(res));
                return resolve (res);
            });
        });
    });
}


module.exports = {
    getInst: function () {
        return new Product();
    }
}