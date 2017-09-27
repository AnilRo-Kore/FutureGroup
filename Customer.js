var collectionName = "Customer";
var dbManager = require("./DBManager.js");
var Promise = require("bluebird");

function Customer() {
}


//get valid Customer
Customer.prototype.checkValidCustomer = function (filter) {
    return new Promise(function(resolve, reject){
        dbManager.getConnection(function (db) {
            db.collection(collectionName).find({
                customerId: {$regex : new RegExp(filter.customerId, "i") },
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

module.exports = {
    getInst: function () {
        return new Customer();
    }
}