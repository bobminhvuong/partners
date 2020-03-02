var router = require('express').Router();
var toolSalesCtrl = require('./../controller/toolSales.controller');
// var auth = require('../middle-ware/auth');

module.exports = function () {
    router.post('/AddOrUpdate', toolSalesCtrl.AddOrUpdate);
    router.get('/get/:userId',toolSalesCtrl.getToolSales)
    return router;
}