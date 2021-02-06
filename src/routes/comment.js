var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Comment = require('../model/comment.model');

router.get('/', (req, res, next) => {
    Comment.find({}).then((data) => {
        res.status(200).json({ message: 'fetch all comments successed!', data: data });
    }).catch((err) => {
        res.status(500).json({ message: err, data: [] });
    })
})

router.get('/:id', (req, res, next) => {
    Comment.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({ message: err, data: {} });
        } else {
            if (data !== null)
                res.status(200).json({ message: `fetch comment with id: ${req.params.id} successed!`, data: data });
            else
                res.status(404).json({ message: `can't found comment with id: ${req.params.id}`, data: null });
        }
    })
})

router.get('/delete/:id', (req, res, next) => {
    Comment.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({ message: `can't delete comment with id: ${req.params.id} because: ${err}` });
        } else {
            res.status(200).json({ message: `delete comment with id: ${req.params.id} successed!` });
        }
    })
})

router.post('/create', (req, res, next) => {
    const newComment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    newComment.save((err) => {
        if (err) {
            res.json({
                result: 'failed',
                data: {},
                message: 'error is ' + err
            });
        } else {
            res.json({
                result: 'ok',
                data: newComment,
                message: 'create new comment successed!'
            });
        }
    })
})

router.post('/modify/:id', (req, res, next) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.json({
                result: 'failed',
                message: 'error is ' + err
            });
        } else {
            res.json({
                result: 'ok',
                message: `modify comment with id: ${req.params.id} successed!`
            });
        }
    })
})

module.exports = router;