var router = require('express').Router();
var userController = require('./../controller/user.controller');
var cusCtrl = require('./../controller/customer.controller');
// var auth = require('../middle-ware/auth');

module.exports = function () {
    router.get('/Get', cusCtrl.getAll);
    router.post('/AddOrEdit', cusCtrl.AddOrEdit);
    router.delete('/delete/:id', cusCtrl.deleteCus);
    return router;
}