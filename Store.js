var collectionName = "Store";
var dbManager = require("./DBManager.js");
var Promise = require("bluebird");

function Store() {
}


//get valid store
Store.prototype.checkValidStore = function (filter) {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({
                storeId: {$regex : new RegExp(filter.storeId, "i") },
            })
            .toArray(function(err, res){
                console.log(res);
                if(err){
                    return reject(err);
                }
                if(res.length>0){
                    return resolve({isValid:true})
                }else{
                    return resolve({isValid:false})
                }
            });
        });
    });
}

//get All Stores
Store.prototype.getAllStores = function () {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({},{_id:0,storeId:1})
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
        return new Store();
    }
}