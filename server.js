var express = require("express");
var bodyParser = require('body-parser');
var Order = require("./Order.js").getInst();
var Product = require("./Product.js").getInst();
var Sales = require("./Sales.js").getInst();

// var Sales = require("./Sales.js").getInst();
// var Customer = require("./Customer.js").getInst();
var Incident = require("./Incident.js").getInst();
// var Store = require("./Store.js").getInst();


var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//get product inventory details
app.get('/futuregroup/bot/product/', function (request, response) {
    var filter = {};
    filter.storeId = request.query.storeId;
    filter.productName = request.query.productName;

    return Product.getInventoryForProduct(filter)
    .then(function(res){
        return response.send(res);
    })
    .catch(function(err){
        console.log(err);
        return response.status(500).send(err);
    });
});


//get product outstock details
app.get('/futuregroup/bot/product/getQuantity/', function (request, response) {
    var filter = {};
    filter.quantity = request.query.quantity;
    filter.storeId = request.query.storeId;
    
    
    return Product.getInventoryStockDetails(filter)
    .then(function(res){
        return response.send(res);
    })
    .catch(function(err){
        console.log(err);
        return response.status(500).send(err);
    });

});


//get order status details
app.get('/futuregroup/bot/order/', function (request, response) {
    var filter = {};
    filter.storeId = request.query.storeId;
    filter.orderId = request.query.orderId;
    filter.customerId = request.query.customerId;

    return Order.getDetailsForOrder(filter)
    .then(function(res){
        return response.send(res);
    })
    .catch(function(err){
        console.log(err);
        return response.status(500).send(err);
    });

});

//get incident details for the customer
app.get('/futuregroup/bot/incident/', function (request, response) {
    var filter = {};
    filter.storeId = request.query.storeId;
    filter.customerId = request.query.customerId;
    filter.incidentId = request.query.incidentId   

    return Incident.getIncidentDetailsForCustomer(filter)
    .then(function(res){
        return response.send(res);
    })
    .catch(function(err){
        console.log(err);
        return response.status(500).send(err);
    });

});


//get sales metrics
app.get('/futuregroup/bot/sales/',function(request, response) {
    var filter = {};
    filter.storeId = request.query.storeId;
    filter.saleDate = request.query.saleDate;

    
    if(request.query.fromSaleDate != null && request.query.toSaleDate){
       // console.log("@@@@@@" + request.query.fromSaleDate  + " " + request.query.toSaleDate) ;
        
        filter.fromSaleDate = request.query.fromSaleDate;
        filter.toSaleDate = request.query.toSaleDate;

        return Sales.getSalesInfoWithinDateRange(filter).then(function(res){
           response.send(res);
        });
    }

    else
        return Sales.getSalesInfo(filter).then(function(res){
        response.send(res);
    })
    .catch(function(err){
        console.log(err);
        return response.status(500).send(err);
    });


});


var port = 3010;
app.listen(port, function () {
    console.log('Example app listening on port !', port)
});
