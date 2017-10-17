var express = require("express");
var bodyParser = require('body-parser');
var Order = require("./Order.js").getInst();
var Product = require("./Product.js").getInst();
var Sales = require("./Sales.js").getInst();
var User = require("./User.js").getInst();
var Incident = require("./Incident.js").getInst();
var Store = require("./Store.js").getInst();


var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//get valid store
app.get('/futuregroup/bot/checkValidStore/', function (request, response) {
    var filter = {};
    filter.storeId = request.query.storeId;
    
    return Store.checkValidStore(filter)
    .then(function(res){
        return response.send(res);
    })
    .catch(function(err){
        console.log(err);
        return response.status(500).send(err);
    });
});

//get allStores
app.get('/futuregroup/bot/getAllStores/', function (request, response) {
    var filter = {};
    return Store.getAllStores()
    .then(function(res){
        return response.send(res);
    })
    .catch(function(err){
        console.log(err);
        return response.status(500).send(err);
    });
});

//get allIncidetns
app.get('/futuregroup/bot/getAllIncidents/', function (request, response) {
    var filter = {};
    return Incident.getAllIncidents()
    .then(function(res){
        return response.send(res);
    })
    .catch(function(err){
        console.log(err);
        return response.status(500).send(err);
    });
});

//get allOrders
app.get('/futuregroup/bot/getAllOrders/', function (request, response) {
    var filter = {};
    return Order.getAllOrders()
    .then(function(res){
        return response.send(res);
    })
    .catch(function(err){
        console.log(err);
        return response.status(500).send(err);
    });
});

//get valid customer
app.get('/futuregroup/bot/checkValidUser/', function (request, response) {
    var filter = {};

if(request.query.userName != null && request.query.password != null){
    // console.log("AA "+ JSON.stringify(request.query) + " "+ JSON.stringify(request.query.userId));
    filter.userName = request.query.userName;
    filter.password = request.query.password;

    return User.checkValidUser(filter)
    .then(function(res){
        return response.send(res);
    })
    .catch(function(err){
        console.log(err);
        return response.status(500).send(err);
    });
}
}
);


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


//get alert fot order details
app.get('/futuregroup/bot/orderAlert/', function (request, response) {
    var filter = {};
    filter.storeId = request.query.storeId;
    filter.orderType = request.query.orderType;
    filter.currentDateTime = new Date();
    return Order.getAlertFororders(filter)
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
    filter.storeId = request.query.storeId,
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
