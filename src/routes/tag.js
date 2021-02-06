var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Tag = require('../model/tag.model');

router.get('/', (req, res, next) => {
    Tag.find({}).then((data) => {
        res.status(200).json({ message: 'fetch all tags successed!', data: data });
    }).catch((err) => {
        res.status(500).json({ message: err, data: [] });
    })
})

router.get('/:id', (req, res, next) => {
    console.log(req.params.id)
    Tag.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({ message: err, data: {} });
        } else {
            if (data !== null)
                res.status(200).json({ message: `fetch tag with id: ${req.params.id} successed!`, data: data });
            else
                res.status(200).json({ message: `can't found user with id: ${req.params.id}`, data: null });
        }
    })
})

router.get('/delete/:id', (req, res, next) => {
    Tag.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({ message: `can't delete tag with id: ${req.params.id} because: ${err}` });
        } else {
            res.status(200).json({ message: `delete tag with id: ${req.params.id} successed!` });
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
            res.json({
                result: 'failed',
                data: {},
                message: 'error is ' + err
            });
        } else {
            res.json({
                result: 'ok',
                data: newTag,
                message: 'create new tag successed!'
            });
        }
    })
})

router.post('/modify/:id', (req, res, next) => {
    Tag.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.json({
                result: 'failed',
                message: 'error is ' + err
            });
        } else {
            res.json({
                result: 'ok',
                message: `modify tag with id: ${req.params.id} successed!`
            });
        }
    })
})

module.exports = router;