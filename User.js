var collectionName = "User";
var dbManager = require("./DBManager.js");
var Promise = require("bluebird");

function User() {
}


//get valid Customer
User.prototype.checkValidUser = function (filter) {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({
                userName: filter.userName,
                password: filter.password
            })
            .toArray(function(err, res){
                if(err){
                    return reject(err);
                }
                if(res.length>0){
                    return resolve({authorizationStatus:"Pass",stroeId:res[0].storeId,role:res[0].role})
                }else{
                    return resolve({authorizationStatus:"Fail"})
                }
            });
        });
    });
}

//get user details based on Id
User.prototype.getUserDetails = function (filter) {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({
                userId: {$regex : new RegExp(filter.userId, "i") }
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
        return new User();
    }
}