var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Comment = require('../model/comment.model');

router.get('/', (req, res, next) => {
    Comment.find({}).then((data) => {
        res.status(200).json({
            result: 'ok',
            message: 'fetch all comments successfully!',
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
    Comment.findById(req.params.id, (err, data) => {
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
                    message: `fetch comment with id: ${req.params.id} successfully!`,
                    data: data
                });
            else
                res.status(404).json({
                    result: 'not found',
                    message: `can't found comment with id: ${req.params.id}`,
                    data: null
                });
        }
    })
})

router.get('/delete/:id', (req, res, next) => {
    Comment.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({
                result: 'failed',
                message: `can't delete comment with id: ${req.params.id} because: ${err}`
            });
        } else {
            res.status(200).json({
                result: 'ok',
                message: `delete comment with id: ${req.params.id} successfully!`
            });
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
            res.status(500).json({
                result: 'failed',
                data: null,
                message: 'error is: ' + err
            });
        } else {
            res.status(200).json({
                result: 'ok',
                data: newComment,
                message: 'create new comment successfully!'
            });
        }
    })
})

router.post('/modify/:id', (req, res, next) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.status(500).json({
                result: 'failed',
                message: 'error is: ' + err
            });
        } else {
            res.status(200).json({
                result: 'ok',
                message: `modify comment with id: ${req.params.id} successfully!`
            });
        }
    })
})

module.exports = router;