var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');

var indexRouter = require('../src/routes/index');
var uploadsRouter = require('../src/routes/uploads');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const dir = __dirname.split('\\').slice(0, __dirname.split('\\').length - 1).join('/');
app.use(express.static(path.join(dir + '/public/uploads')));
console.log(dir + '/public/uploads');
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/', indexRouter);
app.use('/uploads', uploadsRouter);

module.exports = app;
