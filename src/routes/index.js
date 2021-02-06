var express = require('express');
var router = express.Router();
var connect = require('../repositories/connect');

router.get('/', function (req, res, next) {
  console.log("a");
  res.status(200).send({ mes: 'Hello world!' })
});

module.exports = router;
