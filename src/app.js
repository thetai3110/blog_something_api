// Declare instance
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
let mongoose = require('mongoose');
var constants = require('./common/constants');

mongoose.Promise = global.Promise;
mongoose.connect(constants.mongodb, { useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Database connection successful')
    })
    .catch(err => {
        console.error('Database connection error')
    })

// Router
var indexRouter = require('../src/routes/index');
var uploadsRouter = require('../src/routes/uploads');
var tagRouter = require('../src/routes/tag');
var userRouter = require('../src/routes/user');
var blogRouter = require('../src/routes/blog');
var commentRouter = require('../src/routes/comment');

// Set 
var app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const dir = __dirname.split('\\').slice(0, __dirname.split('\\').length - 1).join('/');
app.use(express.static(path.join(dir + '/public/uploads')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/', indexRouter);
app.use('/uploads', uploadsRouter);
app.use('/blog', blogRouter);
app.use('/tag', tagRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/comment', commentRouter);

// export
module.exports = app;
