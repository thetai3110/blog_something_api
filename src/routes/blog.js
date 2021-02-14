var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Blog = require('../model/blog.model');

router.get('/', (req, res, next) => {
    Blog.find({}).then((data) => {
        res.status(200).json({
            result: 'ok',
            message: 'fetch all blogs successfully!',
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

router.get('/published/:published', (req, res, next) => {
    Blog.find({ published: req.params.published }, (err, data) => {
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
                    message: `fetch blog follow published with id: ${req.params.published} successfully!`,
                    data: data
                });
            else
                res.status(404).json({
                    result: 'not found',
                    message: `can't found blog follow published: ${req.params.published}`,
                    data: null
                });
        }
    })
})

router.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id, (err, data) => {
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
                    message: `fetch blog with id: ${req.params.id} successfully!`,
                    data: data
                });
            else
                res.status(404).json({
                    result: 'not found',
                    message: `can't found blog with id: ${req.params.id}`,
                    data: null
                });
        }
    })
})

router.get('/delete/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({
                result: 'failed',
                message: `can't delete blog with id: ${req.params.id} because: ${err}`
            });
        } else {
            res.status(200).json({
                result: 'ok',
                message: `delete blog with id: ${req.params.id} successfully!`
            });
        }
    })
})

router.post('/create', (req, res, next) => {
    const newBlog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    newBlog.save((err) => {
        if (err) {
            res.status(500).json({
                result: 'failed',
                data: null,
                message: 'error is: ' + err
            });
        } else {
            res.status(200).json({
                result: 'ok',
                data: newBlog,
                message: 'create new blog successfully!'
            });
        }
    })
})

router.post('/modify/:id', (req, res, next) => {
    Blog.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.status(500).json({
                result: 'failed',
                message: 'error is: ' + err
            });
        } else {
            res.status(200).json({
                result: 'ok',
                message: `modify blog with id: ${req.params.id} successfully!`
            });
        }
    })
})

module.exports = router;