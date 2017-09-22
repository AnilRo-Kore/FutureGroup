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
                storeId: filter.storeId,
                productName: filter.productName
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
        return new Product();
    }
}