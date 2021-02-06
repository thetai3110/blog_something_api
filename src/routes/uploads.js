const multer = require('multer');
const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const constants = require('../common/constants');
const app = require('../app');
var router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if (err) return cb(err)
            cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname).split('.').pop())
        })
    }
})

var upload = multer({ storage: storage });

router.post('/', upload.array('upload', 12), (req, res, next) => {
    req.files.forEach(el => {
        res.status(200).json({
            uploaded: true,
            url: constants.serverName + '/' + el.filename
        })
    })
})

router.get('/', (req, res, next) => {
    const images = fs.readdirSync('public/uploads');
    var sorted = [];
    images.forEach(image => {
        if (image.split('.').pop() === "png"
            || image.split('.').pop() === "jpg"
            || image.split('.').pop() === "jpeg"
            || image.split('.').pop() === "svg") {
            var abc = {
                'image': '/' + image,
                'folder': '/public/uploads'
            }
            sorted.push(abc);
        }
    });
    res.send(sorted);
})

module.exports = router;