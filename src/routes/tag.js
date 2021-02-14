var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Tag = require('../model/tag.model');

router.get('/', (req, res, next) => {
    Tag.find({}).then((data) => {
        res.status(200).json({
            result: 'ok',
            message: 'fetch all tags successfully!',
            data: data
        });
    }).catch((err) => {
        res.status(500).json({
            result: 'failed',
            message: err,
            data: null
        });
    })
})

router.get('/:id', (req, res, next) => {
    console.log(req.params.id)
    Tag.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                result: 'failed',
                message: err,
                data: null
            });
        } else {
            if (data !== null)
                res.status(200).json({
                    result: 'ok',
                    message: `fetch tag with id: ${req.params.id} successfully!`,
                    data: data
                });
            else
                res.status(404).json({
                    result: 'not found',
                    message: `can't found user with id: ${req.params.id}`,
                    data: null
                });
        }
    })
})

router.get('/delete/:id', (req, res, next) => {
    Tag.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({
                result: 'failed',
                message: `can't delete tag with id: ${req.params.id} because: ${err}`
            });
        } else {
            res.status(200).json({
                result: 'ok',
                message: `delete tag with id: ${req.params.id} successfully!`
            });
        }
    })
})

router.post('/create', (req, res, next) => {
    const newTag = new Tag({
        _id: new mongoose.Types.ObjectId(),
        tagName: req.body.tagName
    });
    newTag.save((err) => {
        if (err) {
            res.status(500).json({
                result: 'failed',
                data: null,
                message: 'error is: ' + err
            });
        } else {
            res.status(200).json({
                result: 'ok',
                data: newTag,
                message: 'create new tag successfully!'
            });
        }
    })
})

router.post('/modify/:id', (req, res, next) => {
    Tag.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.status(500).json({
                result: 'failed',
                message: 'error is: ' + err
            });
        } else {
            res.status(200).json({
                result: 'ok',
                message: `modify tag with id: ${req.params.id} successfully!`
            });
        }
    })
})

module.exports = router;