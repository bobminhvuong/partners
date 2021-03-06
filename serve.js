var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var logger = require('morgan');
var path = require("path");
var cors = require('cors');
var app = express();
var fileUpload = require('express-fileupload');
var config = require('./config');

app.use(logger('dev'));
app.use(fileUpload());
app.use(cors());//cấp quyền cho phép sử dụng api 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, 'app-client/dist')));
app.use('/public', express.static('public'));

//Api--
app.use('/api/customer', require('./routes/customer.router')());
app.use('/api/user', require('./routes/user.route')());
app.use('/api/auth', require('./routes/auth.route')());
app.use('/api/vip', require('./routes/vip.route')());
app.use('/api/toolSales', require('./routes/toolSales.route')());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/app-client/dist/index.html'));
});

app.listen(process.env.PORT || config.PORT);
console.log('serve is listening port ' + config.PORT);
