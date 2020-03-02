var router = require('express').Router();
var vipController = require('./../controller/vip.controller');
// var auth = require('../middle-ware/auth');

module.exports = function () {
    router.post('/requestCreate', vipController.create);
    return router;
}